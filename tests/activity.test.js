require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "trailblaze",
  });
});
afterEach(async () => {
  await mongoose.connection.close();
});

describe("/activitities/:id", () => {
  test("GET 200: Responds with the correct activity data for ", async () => {
    const expected = {
      _id: "664cb5c008f145354b9d14b7",
      activity_id: 1,
      exercise_name: "running",
      user_id: 2,
      distance: null,
    };
    const result = await request(app).get("/activities/1");
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(expected);
  });

  test("Responds with 404 err when id is non-existent", async () => {
    const result = await request(app).get("/activities/9999");
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("No matching activity found");
  });

  test("Responds with 500 err when id is invalid", async () => {
    const result = await request(app).get("/activities/abcd");
    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe(
      "An error occurred while fetching the activity"
    );
  });
});
