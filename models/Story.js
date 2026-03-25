const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
	chapterNumber: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		default: function () {
			return `Chapter ${this.chapterNumber}`;
		},
	},
	content: {
		type: String,
		required: true,
	},
});

const StorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	status: {
		type: String,
		default: "public",
		enum: ["public", "private"],
	},
	chapters: {
		type: [ChapterSchema],
		validate: {
			validator: (v) => v.length > 0,
			message: "A story must have atleast one chapter.",
		},
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;
