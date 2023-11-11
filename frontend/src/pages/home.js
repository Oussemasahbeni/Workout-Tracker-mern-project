import { useEffect, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// component
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const { workouts, dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts");
        const result = response.data;
        if (response.status === 200) {
          console.log(result);
          // setWorkouts(result);
          dispatch({ type: "SET_WORKOUTS", payload: result });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setError("Error fetching workouts. Please check your network.");
      }
    };

    fetchWorkouts();
  }, [dispatch]);
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
