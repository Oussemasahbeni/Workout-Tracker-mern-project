import mongoose from "mongoose";
const { Schema, model } = mongoose;
const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
    sets: { type: Number, required: true },
    user_id: { type: String, required: true },
    // description: { type: String, required: true },
  },
  { timestamps: true }
);
export const WorkoutModel = model("Workout", workoutSchema);
