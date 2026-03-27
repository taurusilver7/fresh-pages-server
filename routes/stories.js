// Creating, editing stories routes are under stories.js
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../controller/auth");

const Story = require("../models/Story");

/*
@desc    Show add page
@route  GET /stories/add
*/
router.get("/add", ensureAuth, (req, res) => {
	res.render("stories/add");
});

/*
@desc    Show all stories
@route  GET /stories/
*/
router.get("/", ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({ status: "public" })
			.populate("user", "displayName firstName image")
			.sort({ createdAt: "desc" })
			.lean();

		res.render("stories/index", { stories });
	} catch (err) {
		console.error(err);
		res.render("error/500");
	}
});

/*
@desc    Process add form - build chapter array from parallel arrays
@route  POST /stories
*/
router.post("/", ensureAuth, async (req, res) => {
	try {
		const chapterTitles = Array.isArray(req.body.chapterTitles)
			? req.body.chapterTitles
			: [req.body.chapterTitles];

		const chapterContents = Array.isArray(req.body.chapterContents)
			? req.body.chapterContents
			: [req.body.chapterContents];

		const chapters = chapterTitles.map((title, index) => ({
			chapterNumber: index + 1,
			title: title || `Chapter ${index + 1}`,
			content: chapterContents[index] || "",
		}));

		await Story.create({
			title: req.body.title,
			description: req.body.description || "",
			status: req.body.status,
			user: req.user.id,
			chapters,
		});
		res.redirect("/dashboard");
	} catch (err) {
		console.error(err);
		res.render("/error/500");
	}
});

/*
@desc    Show edit page
@route  GET /stories/edit/:id
*/
router.get("/edit/:id", ensureAuth, async (req, res) => {
	try {
		const story = await Story.findOne({ _id: req.params.id }).lean();

		if (!story) {
			return res.render("error/404");
		}

		if (story.user.toString() != req.user.id) {
			return res.redirect("/stories");
		} else {
			res.render("stories/edit", { story });
		}
	} catch (err) {
		console.error(err);
		res.render("error/500");
	}
});

/*
@desc    Show user stories
@route  GET /stories/user/:userId
*/
router.get("/user/:userId", ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({
			user: req.params.userId,
			status: "public",
		})
			.populate("user", "displayName firstName image")
			.lean();

		res.render("stories/index", { stories });
	} catch (err) {
		console.error(err);
		res.render("error/500");
	}
});

//? --------------  DYNAMIC ROUTING -------------------------

/*
@desc    Show single story page with chapter support: ?chapter=N
@route  GET /stories/:id
*/
router.get("/:id", ensureAuth, async (req, res) => {
	try {
		

		const story = await Story.findById(req.params.id)
			.populate("user", "displayName firstName image")
			.lean();

		if (!story) {
			return res.render("error/404");
		}

		// private story: only owners can view
		if (story.status === "private") {
			if (!req.user || req.user.id !== story.user._id.toString()) {
				return res.render("error/404");
			}
		}

		// resolve requested chapter - default to 1
		const reqChapter = parseInt(req.query.chapter) || 1;
		const chapter =
			story.chapters.find((c) => parseInt(c.chapterNumber) === reqChapter) ||
			story.chapters[0];


		res.render("stories/show", {
			story,
			chapter,
			currentChapter: chapter.chapterNumber,
			totalChapters: story.chapters.length,
			prevChapter:
				chapter.chapterNumber > 1 ? chapter.chapterNumber - 1 : null,
			nextChapter:
				chapter.chapterNumber < story.chapters.length
					? chapter.chapterNumber + 1
					: null,
		});
	} catch (err) {
		console.error(err);
		res.render("error/404");
	}
});

/*
@desc    Update story: rebuild chapters array from parallel array
@route  PUT /stories/:id
*/
router.put("/:id", ensureAuth, async (req, res) => {
	try {
		const story = await Story.findById(req.params.id)
			.populate("user", "displayName")
			.lean();


		if (!story) {
			return res.render("error/404");
		}

		if (story.user._id.toString() != req.user.id) {
			return res.redirect("/stories");
		}

		const chapterTitles = Array.isArray(req.body.chapterTitles)
			? req.body.chapterTitles
			: [req.body.chapterTitles];

		const chapterContents = Array.isArray(req.body.chapterContents)
			? req.body.chapterContents
			: [req.body.chapterContents];

		const chapters = chapterTitles.map((title, i) => ({
			chapterNumber: i + 1,
			title: title || `Chapter ${i + 1}`,
			content: chapterContents[i] || "",
		}));

		

		await Story.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description || "",
				status: req.body.status,
				chapters,
			},
			{
				new: true,
				runValidators: true,
			},
		);

		res.redirect("/dashboard");
	} catch (error) {
		console.error(error);
		return res.render("error/500");
	}
});

/*
@desc    Delete Story
@route  DEL /stories/:id
*/
router.delete("/:id", ensureAuth, async (req, res) => {
	try {
		await Story.findByIdAndDelete({ _id: req.params.id });
		res.redirect("/dashboard");
	} catch (err) {
		console.error(err);
		return res.render("error/500");
	}
});

module.exports = router;
