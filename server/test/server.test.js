/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");

beforeEach(async () => {
  const testMongoURL = "mongodb://localhost:27017/testDatabase";

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(testMongoURL);
});

afterEach(async () => {
  await mongoose.disconnect();
  await new Promise((resolve) => server.close(resolve));
});

describe("POST /api/create", () => {
  test("should create a new student if the ID does not exist", async () => {
    const studentData = {
      fname: "John",
      lname: "Doe",
      _id: "123",
      course: "Computer Science",
      fees: 1000,
      courseStart: "2024-02-01",
      courseEnd: "2024-02-02",
    };

    const response = await request(app).post("/api/create").send(studentData);

    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe("Student created successfully");
  });

  test("should not create a new student if the ID already exists", async () => {
    const existingStudentData = {
      fname: "Jane",
      lname: "Doe",
      _id: "123", 
      course: "Mathematics",
      fees: 1500,
      courseStart: "2024-02-01",
      courseEnd: "2024-02-02",
    };

    const response = await request(app)
      .post("/api/create")
      .send(existingStudentData);

    expect(response.statusCode).toBe(400); 
    expect(response.body.msg).toBe("Student with ID 123 already exists");
  });

  test("should handle blank entry error", async () => {
    const invalidStudentData = {
      fname: "",
      lname: "Doe",
      _id: "123456",
      course: "Computer Science",
      fees: 1000,
      courseStart: new Date(),
      courseEnd: new Date(),
    };

    const response = await request(app)
      .post("/api/create")
      .send(invalidStudentData);

    expect(response.statusCode).toBe(400);
    expect(response.body.msg).toBe("Blank entry Error");
  });
});
