/**
 * Unit testing with jest
 */

const { describe } = require("node:test");
const { truncate, stripTags, formatDate } = require("../utils/hbs");

describe("truncate", () => {
	test("returns empty string for null input", () => {
		expect(truncate(null, 100)).toBe("");
	});

	test("returns empty string for undefined input", () => {
		expect(truncate(undefined, 100)).toBe("");
	});

	test("returns string as-is if shorter than len", () => {
		expect(truncate("hello", 100)).toBe("hello");
	});

	test("truncates at last word boundary", () => {
		const result = truncate("hello world foo bar", 10);
		expect(result).toBe("hello...");
	});

	test("truncates at exact len if no space found", () => {
		const result = truncate("helloworldfoobar", 5);
		expect(result).toBe("hello...");
	});
});

describe("stripTags", () => {
	test("return empty string for null", () => {
		expect(stripTags(null)).toBe("");
	});

	test("strips html tags", () => {
		expect(stripTags("<p>hello <strong>world</strong></p>")).toBe(
			"hello world",
		);
	});

	test("returns plain text unchanged", () => {
		expect(stripTags("hello world")).toBe("hello world");
	});
});

describe("formatDate", () => {
	test("formats date correctly", () => {
		const date = new Date("2021-04-24");
		const result = formatDate(date, "MMM Do YYYY");
		expect(result).toBe("Apr 24th 2021");
	});
});
