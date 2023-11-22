import axios from "axios";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
// import { useWorkoutApi } from "../hooks/useWorkoutApi";
import { CascadeSelect } from "primereact/cascadeselect";

import { InputText } from "primereact/inputtext";

import {
  bicepsExercises,
  tricepsExercises,
  chestExercises,
  legsExercises,
  forearmsExercises,
  backExercises,
  shoulderExercises,
} from "../hooks/useWorkoutApi";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  // const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const Workouts = [
    {
      workoutName: "Biceps",
      code: "Biceps",
      exercises: bicepsExercises.map((exercise) => ({ wname: exercise.name })),
    },
    {
      workoutName: "Triceps",
      code: "Triceps",
      exercises: tricepsExercises.map((exercise) => ({ wname: exercise.name })),
    },
    {
      workoutName: "Chest",
      code: "Chest",
      exercises: chestExercises.map((exercise) => ({ wname: exercise.name })),
    },
    {
      workoutName: "Back",
      code: "Back",
      exercises: backExercises.map((exercise) => ({ wname: exercise.name })),
    },
    {
      workoutName: "Legs",
      code: "Legs",
      exercises: legsExercises.map((exercise) => ({ wname: exercise.name })),
    },
    {
      workoutName: "Shoulders",
      code: "Shoulders",
      exercises: shoulderExercises.map((exercise) => ({
        wname: exercise.name,
      })),
    },
    {
      workoutName: "Forearms",
      code: "Forearms",
      exercises: forearmsExercises.map((exercise) => ({
        wname: exercise.name,
      })),
    },
  ];

  const notify = () => toast.success("Workout added successfully!");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh on form submission and  Prevent the default form submission behavior

    if (!user) {
      setError("Please login to add a workout");
      return;
    }

    const workout = { title: selectedWorkout.wname, load, reps, sets };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        workout,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const result = response.data;

      if (response.status === 200) {
        setError(null);

        // setTitle("");
        setLoad("");
        setReps("");
        setSets("");
        setSelectedWorkout(null);
        setEmptyFields([]);
        notify();
        dispatch({ type: "CREATE_WORKOUT", payload: result });
      }
    } catch (error) {
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
      <h3 className="text-3xl  text-form_title text-left font-semibold mb-5">
        Add a new Workout
      </h3>

      {/* <label> Exercise Title</label> */}
      <div className="card flex content-center mb-5 ">
        <CascadeSelect
          inputId="cs-city"
          value={selectedWorkout}
          onChange={(e) => {
            setSelectedWorkout(e.value);
          }}
          options={Workouts}
          optionLabel="wname"
          optionGroupLabel="workoutName"
          optionGroupChildren={["exercises", "name"]}
          placeholder="Select a workout"
          className="w-full "
          breakpoint="767px"
          style={{ minWidth: "14rem" }}
        />
      </div>
      {/* <label> Exercise Title</label>
      <input
        type="text"
        required
        value={title} // we need to set the value of the input to the state so that the state is updated as the user types
        onChange={(e) => setTitle(e.target.value)} // we need to update the state as the user types so that the value of the input is updated
        className={emptyFields.includes("title") ? "error" : ""}
      />*/}
      <label>Load (in kg):</label>
      <InputText
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <InputText
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <label>Number of Sets:</label>
      <InputText
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields.includes("sets") ? "error" : ""}
      />
      <button className="bg-primary text-white p-4 font-poppins rounded-lg cursor-pointer ">
        <i className="pi  pi-plus"></i> Add Workout
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
