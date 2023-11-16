import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

// we get the workout as a prop from the parent component
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await axios.delete(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const result = response.data;

    if (response.status === 200) {
      console.log("Workout deleted successfully:", result);
      dispatch({ type: "DELETE_WORKOUT", payload: result });
    }
  };
  return (
    <div className="workout-details">
      <h4> {workout.title}</h4>
      <p>
        <strong>Load(kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
