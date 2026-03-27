const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe("GET /stories", () => {
	test("return 200 and renders public stories", async () => {
		const res = await request(app).get("/stories");
		expect(res.statusCode).toBe(200);
		expect(res.text).toContain("Public Stories");
	});
});

describe("GET /stories/:id (private story)", () => {
	test("returns 404 for private story accessed without auth", async () => {
		// Use a known private story ID from your test DB
		const res = await request(app).get("/stories/69c52fe9da2b2e4b3c6cb0fe");
		expect(res.statusCode).toBe(404);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
