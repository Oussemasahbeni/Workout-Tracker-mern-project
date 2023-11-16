import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkout } = useWorkoutContext();
  const logout = () => {
    // remove user from local storage to log user out

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchWorkout({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
