import express from "express";
import requireAuth from "../middleware/requireAuth.js";

import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
const router = express.Router();

// protect all routes by firing the requireAuth middleware
// if the user is not authenticated, they will not be able to access any of the routes below
router.use(requireAuth);
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
