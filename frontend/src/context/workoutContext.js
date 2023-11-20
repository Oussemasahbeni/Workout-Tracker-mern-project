import { createContext, useReducer } from "react";

// create a context object
export const WorkoutContext = createContext();

// state is the current state of the application and action is the action we want to perform on the state
export const workoutsReducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "EDIT_WORKOUTS":
      // Find the index of the old workout
      const editedIndex = state.workouts.findIndex(
        (w) => w._id === action.payload._id
      );

      if (editedIndex !== -1) {
        // If the old workout is found, replace it with the new one
        const updatedWorkouts = [...state.workouts];
        updatedWorkouts[editedIndex] = action.payload;

        return {
          workouts: updatedWorkouts,
        };
      } else {
        // If the old workout is not found, just add the new one to the beginning
        return {
          workouts: [action.payload, ...state.workouts],
        };
      }
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  //console.log("WorkoutContextProvider:", state);
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
