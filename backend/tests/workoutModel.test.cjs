import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server"; 
import { WorkoutModel } from "../models/workoutModel";

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await WorkoutModel.deleteMany();
});

describe("Workout Controller", () => {
  describe("GET /workouts", () => {
    test("should get all workouts", async () => {
      // Insert some sample data for testing
      await WorkoutModel.create({
        title: "Sample Workout",
        load: 100,
        reps: 10,
        sets: 3,
        user_id: "someUserId",
      });

      const response = await request(app).get("/workouts");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe("Sample Workout");
    });
  });

  describe("GET /workouts/:id", () => {
    test("should get a single workout", async () => {
      const workout = await WorkoutModel.create({
        title: "Sample Workout",
        load: 100,
        reps: 10,
        sets: 3,
        user_id: "someUserId",
      });

      const response = await request(app).get(`/workouts/${workout._id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Sample Workout");
    });

    test("should return 404 for a non-existent workout", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/workouts/${nonExistentId}`);
      expect(response.status).toBe(404);
    });

    test("should return 400 for an invalid workout ID", async () => {
      const response = await request(app).get("/workouts/invalidId");
      expect(response.status).toBe(400);
    });
  });

  describe("POST /workouts", () => {
    test("should create a new workout", async () => {
      const newWorkoutData = {
        title: "New Workout",
        load: 50,
        reps: 8,
        sets: 4,
        user_id: "someUserId",
      };

      const response = await request(app)
        .post("/workouts")
        .send(newWorkoutData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(newWorkoutData.title);
      expect(response.body.load).toBe(newWorkoutData.load);
      expect(response.body.reps).toBe(newWorkoutData.reps);
      expect(response.body.sets).toBe(newWorkoutData.sets);
      expect(response.body.user_id).toBe(newWorkoutData.user_id);
    });

    test("should return 400 for incomplete data", async () => {
      const incompleteWorkoutData = {
        title: "Incomplete Workout",
        // Missing load, reps, sets
        user_id: "someUserId",
      };

      const response = await request(app)
        .post("/workouts")
        .send(incompleteWorkoutData);

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /workouts/:id", () => {
    test("should update an existing workout", async () => {
      const workout = await WorkoutModel.create({
        title: "Old Workout",
        load: 30,
        reps: 5,
        sets: 2,
        user_id: "someUserId",
      });

      const updatedWorkoutData = {
        title: "Updated Workout",
        load: 40,
        reps: 8,
        sets: 3,
      };

      const response = await request(app)
        .put(`/workouts/${workout._id}`)
        .send(updatedWorkoutData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedWorkoutData.title);
      expect(response.body.load).toBe(updatedWorkoutData.load);
      expect(response.body.reps).toBe(updatedWorkoutData.reps);
      expect(response.body.sets).toBe(updatedWorkoutData.sets);
    });

    test("should return 400 for an invalid workout ID", async () => {
      const response = await request(app)
        .put("/workouts/invalidId")
        .send({ title: "Updated Workout" });
      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /workouts/:id", () => {
    test("should delete an existing workout", async () => {
      const workout = await WorkoutModel.create({
        title: "ToDelete Workout",
        load: 20,
        reps: 7,
        sets: 3,
        user_id: "someUserId",
      });

      const response = await request(app).delete(`/workouts/${workout._id}`);
      expect(response.status).toBe(200);

      const deletedWorkout = await WorkoutModel.findById(workout._id);
      expect(deletedWorkout).toBeNull(); // Check that the workout no longer exists in the database
    });

    test("should return 404 for a non-existent workout", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app).delete(`/workouts/${nonExistentId}`);
      expect(response.status).toBe(404);
    });

    test("should return 400 for an invalid workout ID", async () => {
      const response = await request(app).delete("/workouts/invalidId");
      expect(response.status).toBe(400);
    });
  });
});
