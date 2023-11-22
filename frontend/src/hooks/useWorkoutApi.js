import exercises from "../workouts.json";

export const bicepsExercises = exercises.filter(
  (exercise) => exercise.muscle === "biceps"
);
export const chestExercises = exercises.filter(
  (exercise) => exercise.muscle === "chest"
);
export const tricepsExercises = exercises.filter(
  (exercise) => exercise.muscle === "triceps"
);
export const backExercises = exercises.filter(
  (exercise) => exercise.muscle === "back"
);
export const forearmsExercises = exercises.filter(
  (exercise) => exercise.muscle === "forearms"
);
export const legsExercises = exercises.filter(
  (exercise) => exercise.muscle === "legs"
);
export const shoulderExercises = exercises.filter(
  (exercise) => exercise.muscle === "shoulders"
);
