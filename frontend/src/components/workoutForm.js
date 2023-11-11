import axios from "axios";
import { useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); // we need to keep track of the empty fields so that we can display the error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh on form submission and  Prevent the default form submission behavior

    const workout = { title, load, reps };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        workout
      );
      const result = response.data;
      //   if (!response.success) {
      //     setError(result.error);
      //   }

      if (response.status === 200) {
        setError(null);
        // console.log("Workout created successfully:", result);
        setTitle("");
        setLoad("");
        setReps("");
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: result });
      }
    } catch (error) {
      // console.log("Error creating workout:", error);
      const result = error.response.data;
      if (error.response.status === 400) {
        setEmptyFields(result.emptyFields);
        setError(result.error);
      } else {
        setError(result.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a new Workout</h3>
      <label> Exercise Title</label>
      <input
        type="text"
        required
        value={title} // we need to set the value of the input to the state so that the state is updated as the user types
        onChange={(e) => setTitle(e.target.value)} // we need to update the state as the user types so that the value of the input is updated
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button> Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
