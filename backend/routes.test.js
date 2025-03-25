const request = require("supertest");
const express = require("express");
const router = require("../routes"); 
const { pool } = require("../database/connectDB");

// Mock authentication middleware
jest.mock("../isAuth", () => (req, res, next) => next());
jest.mock("../isAutho", () => () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use(router);

describe("GET /clubs", () => {
  beforeAll(async () => {
    await pool.promise().query("INSERT INTO club (club_name) VALUES ('Test Club')");
  });

  afterAll(async () => {
    await pool.promise().query("DELETE FROM club WHERE club_name = 'Test Club'");
    await pool.end();
  });

  it("should return a list of clubs", async () => {
    const response = await request(app).get("/clubs");

    expect(response.status).toBe(200);
    expect(response.body.clubs).toBeInstanceOf(Array);
    expect(response.body.clubs.length).toBeGreaterThan(0);
  });

  it("should return 404 if no clubs exist", async () => {
    await pool.promise().query("DELETE FROM club");

    const response = await request(app).get("/clubs");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No clubs found");
  });
});
