import { WorkoutModel } from "../models/workoutModel.js";
import mongoose from "mongoose";
// get all workouts

export const getWorkouts = async (req, res) => {
  try {
    const result = await WorkoutModel.find({}).sort({ createAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get one workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid workout ID" });
    const result = await WorkoutModel.findById(id);
    if (!result) {
      res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create one workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  // add doc to db
  try {
    const workout = await WorkoutModel.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update one workout

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid workout ID" });
    const workout = await WorkoutModel.findByIdAndUpdate(
      id,
      {
        title,
        load,
        reps,
      },
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete one workout

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid workout ID" });
    const workout = await WorkoutModel.findByIdAndDelete(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
