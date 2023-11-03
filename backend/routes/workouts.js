import express from "express";

import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
const router = express.Router();

// get all workouts
router.get("/", getWorkouts);

// get one workout
router.get("/:id", getWorkout);

// create one workout
router.post("/", createWorkout);
// update one workout
router.patch("/:id", updateWorkout);

// delete one workout
router.delete("/:id", deleteWorkout);

export default router;
