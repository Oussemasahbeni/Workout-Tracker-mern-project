import { WorkoutModel } from "../models/workoutModel.js";
import mongoose from "mongoose";
// get all workouts

export const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const result = await WorkoutModel.find({ user_id }).sort({ createAt: -1 });
    // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// get one workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  console.log(id);
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
  const { title, load, reps, sets } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");
  if (!sets) emptyFields.push("sets");

  console.log(emptyFields);
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the form", emptyFields });
  }
  // add doc to db
  try {
    const user_id = req.user._id;
    const workout = await WorkoutModel.create({
      title,
      load,
      reps,
      user_id,
      sets,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update one workout

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps, sets } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid workout ID" });
    const workout = await WorkoutModel.findByIdAndUpdate(
      id,
      {
        title,
        load,
        reps,
        sets,
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
