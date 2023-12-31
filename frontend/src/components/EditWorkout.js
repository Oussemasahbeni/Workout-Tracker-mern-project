import { useEffect, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";

const EditWorkout = ({ workout, onCloseDialog }) => {
  const { _id } = workout;
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [sets, setSets] = useState("");
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const notify = () => {
    toast.success("Workout edited successfully!");
  };
  useEffect(() => {
    if (workout) {
      setTitle(workout.title);
      setLoad(workout.load);
      setReps(workout.reps);
      setSets(workout.sets);
    }
  }, [workout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login to Edit a workout");
      return;
    }

    if (!load || !reps || !sets) {
      setError("Please fill out all fields");
      return;
    }

    const updatedWorkout = { title, load, reps, sets };

    // console.log(updatedWorkout);

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/workouts/${_id}`,
        updatedWorkout,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
        setSets("");
        notify();
        // console.log("Workout edited successfully:", response.data);
        dispatch({ type: "EDIT_WORKOUTS", payload: response.data });

        onCloseDialog();
      }
    } catch (error) {
      setError("Error editing workout. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create p-4 rounded">
      <h3 className="text-3xl text-center text-form_title  font-semibold mb-5">
        Edit Workout
      </h3>
      <label> Exercise Title</label>
      <InputText
        type="text"
        required
        name="title"
        value={title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Load (in kg):</label>
      <InputText
        type="number"
        name="load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Number of Reps:</label>
      <InputText
        type="number"
        name="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <label>Number of Sets:</label>
      <InputText
        type="number"
        name="sets"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
      />
      <button
        data-testid="submit"
        className="bg-primary text-white p-4 font-poppins rounded-lg cursor-pointer"
      >
        Edit Workout
      </button>
      {error && <div className="errorDiv">{error}</div>}
    </form>
  );
};

export default EditWorkout;
