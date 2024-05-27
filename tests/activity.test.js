const request = require("supertest");
const app = require("../index");
const ActivityModel = require("../models/activityModel");
const testData = require("../db/data/test-data/index");

beforeEach(async () => {
  await ActivityModel.deleteMany({});
  for (const activity of testData.activity) {
    await ActivityModel.create(activity);
  }
});

// [
//   { activity_id: 1, exercise_name: "running", user_id: 1 },
//   { activity_id: 2, exercise_name: "walking", user_id: 2 },
//   { activity_id: 3, exercise_name: "cycling", user_id: 1 },
//   { activity_id: 4, exercise_name: "cycling", user_id: 3 },
//   { activity_id: 5, exercise_name: "cycling", user_id: 5 },
//   { activity_id: 6, exercise_name: "cycling", user_id: 6 },
//   { activity_id: 7, exercise_name: "walking", user_id: 2 },
//   { activity_id: 8, exercise_name: "walking", user_id: 2 },
// ];
describe("GET/activities", () => {
  test("Responds with all activities which are the same as activity test data", async () => {
    const result = await request(app).get("/activities");
    expect(result.statusCode).toBe(200);
    expect(result.body.length).toBe(testData.activity.length);
    result.body.forEach((object, index) => {
      expect(object.exercise_name).toBe(testData.activity[index].exercise_name);
      expect(object.user_id).toBe(testData.activity[index].user_id);
    });
  });
});

describe("GET/activitities/:id", () => {
  test("Responds with the correct activity data for existent activity_id ", async () => {
    const result = await request(app).get("/activities/1");
    const expected = testData.activity[0];
    expect(result.statusCode).toBe(200);
    expect(result.body.activity_id).toBe(expected.activity_id);
    expect(result.body.exercise_name).toBe(expected.exercise_name);
    expect(result.body.user_id).toBe(expected.user_id);
  });

  test("Responds with 404 err when id is non-existent", async () => {
    const result = await request(app).get("/activities/9999");
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("No matching result found");
  });

  test("Responds with 400 err when id is invalid", async () => {
    const result = await request(app).get("/activities/abcd");
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("Bad request");
  });
});

describe("POST/activities", () => {
  test("Responds with the newly added activity data ", async () => {
    const activityToAdd = {
      exercise_name: "walking",
      user_id: 3,
    };
    const result = await request(app).post("/activities").send(activityToAdd);
    expect(result.statusCode).toBe(201);
    expect(result.body.exercise_name).toBe(activityToAdd.exercise_name);
    expect(result.body.user_id).toBe(activityToAdd.user_id);
    expect(result.body.distance).toBe(0);
  });

  test("Responds with error", async () => {
    const activityToAdd = {
      exercise_name: "walking",
      user_id: "myID",
    };
    const result = await request(app).post("/activities").send(activityToAdd);
    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe("Activity validation failed");
  });
});

describe("UPDATE/activities/:activity_id", () => {
  test("Responds with 200 status code when activity_id and request body are valid", async () => {
    const activityPropertyToUpdate = { completed_at: Date.now() };
    const updatedActivity = await request(app)
      .patch("/activities/5")
      .send(activityPropertyToUpdate);
    expect(updatedActivity.statusCode).toBe(200);
  });

  test("Responds with 404 status code when activity_id is non-existent", async () => {
    const activityPropertyToUpdate = { completed_at: Date.now() };
    const updatedActivity = await request(app)
      .patch("/activities/9999")
      .send(activityPropertyToUpdate);
    expect(updatedActivity.statusCode).toBe(404);
    expect(updatedActivity.body.message).toBe("No matching result found");
  });

  test("Responds with 400 status code when activity_id is invalid", async () => {
    const activityPropertyToUpdate = { completed_at: Date.now() };
    const updatedActivity = await request(app)
      .patch("/activities/abced")
      .send(activityPropertyToUpdate);
    expect(updatedActivity.statusCode).toBe(400);
    expect(updatedActivity.body.message).toBe("Bad request");
  });

  test("Responds with 400 when request body does not have completed_at key", async () => {
    const activityPropertyToUpdate = { completed: Date.now() };
    const updatedActivity = await request(app)
      .patch("/activities/5")
      .send(activityPropertyToUpdate);
    expect(updatedActivity.statusCode).toBe(400);
    expect(updatedActivity.body.message).toBe("Bad request");
  });

  test("Responds with ? when request body completed_at key is not a date", async () => {
    const activityPropertyToUpdate = { completed: 9900 };
    const updatedActivity = await request(app)
      .patch("/activities/5")
      .send(activityPropertyToUpdate);
    expect(updatedActivity.statusCode).toBe(400);
    expect(updatedActivity.body.message).toBe("Bad request");
  });
});

describe("DELETE/activities/:activity_id", () => {
  test("Responds with statuscode 200", async () => {
    const deletedActivity = await request(app).delete("/activities/2");
    expect(deletedActivity.statusCode).toBe(200);
  });

  test("Responds with 404 error when activiy_id is non-existent", async () => {
    const deletedActivity = await request(app).delete("/activities/9999");
    expect(deletedActivity.statusCode).toBe(404);
    expect(deletedActivity.body.message).toBe("No matching activity found");
  });
  test("Responds with 400 error when activity_id is invalid", async () => {
    const deletedActivity = await request(app).delete("/activities/abcd");
    expect(deletedActivity.statusCode).toBe(400);
  });
});

describe("GET/activities/user/:user_id", () => {
  test("Responds with all activities that below to this user", async () => {
    const result = await request(app).get("/activities/user/1");
    expect(result.statusCode).toBe(200);
    expect(result.body.length).toBe(
      testData.activity.filter((activity) => activity.user_id === 1).length
    );
  });
  test("Responds with 404 error when user_id is non-existent", async () => {
    const result = await request(app).get("/activities/user/9999");
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("No matching activities found");
  });

  test("Responds with 400 error when user_id is invalid", async () => {
    const result = await request(app).get("/activities/user/abc");
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("Bad request");
  });
});
