import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  // useContext is a hook that returns the current context value for the context
  const context = useContext(WorkoutContext);
  // if context is undefined, means we are not inside a provider

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
