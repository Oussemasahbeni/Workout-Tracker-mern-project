import { useEffect, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// component
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(workouts);
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const result = response.data;

        if (response.status === 200) {
          console.log(result);
          dispatch({ type: "SET_WORKOUTS", payload: result });
          setLoading(false);
          setEmpty(false);

          if (result.length === 0) {
            setEmpty(true);
          } else {
            setEmpty(false);
          }
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setError("Error fetching workouts. Please check your network.");
        setLoading(false);
      }
    };

    if (user) {
      fetchWorkouts();
      setLoading(true);
    }
  }, [dispatch, user]);
  return (
    <div className=" home  grid gap-32 ">
      <div className="workouts">
        {loading && <p>Loading...</p>}
        {empty && workouts.length === 0 && (
          <div>
            <p className="mb-4 font-bold">Start Adding Exercise </p>{" "}
            <img
              className="w-full max-w-md mb-4"
              src="/startMakingWorkouts.jpg"
              alt=""
            />
          </div>
        )}
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
