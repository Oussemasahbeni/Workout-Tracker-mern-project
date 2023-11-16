import { useEffect, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
// component
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const result = response.data;
        if (response.status === 200) {
          //console.log(result);
          dispatch({ type: "SET_WORKOUTS", payload: result });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setError("Error fetching workouts. Please check your network.");
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
        {error && <p>{error}</p>}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
