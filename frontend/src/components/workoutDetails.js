import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import EditWorkout from "./EditWorkout";

// we get the workout as a prop from the parent component
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [visible, setVisible] = useState(false);

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

  const handleEdit = () => {
    if (!user) {
      return;
    }
    setVisible(true);
    //navigate(`/edit/${workout._id}`, { state: { workout } });
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };
  return (
    <div className="bg-header_bg rounded mx-auto my-5 p-5 relative shadow-md">
      <h4 className=" text-primary text-lg mb-3"> {workout.title}</h4>
      <p className="m-0, text-gray-700">
        <strong>Load(kg):</strong> {workout.load}
      </p>
      <p className="m-0, text-gray-700">
        <strong>Reps:</strong> {workout.reps}
      </p>
      {/* <p className="m-0, text-gray-700">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p> */}

      <div className="m-0 text-gray-700">
        {workout.createdAt === workout.updatedAt ? (
          <div>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </div>
        ) : (
          <div>
            {formatDistanceToNow(new Date(workout.updatedAt), {
              addSuffix: true,
            })}
          </div>
        )}
      </div>

      <span
        className="material-symbols-outlined absolute top-4 right-4 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-700"
        onClick={handleClick}
      >
        Delete
      </span>
      <Button
        className="material-symbols-outlined absolute top-16 right-4 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-700"
        onClick={handleEdit}
      >
        Edit
      </Button>

      {/* <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      /> */}
      <Dialog
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {<EditWorkout workout={workout} onCloseDialog={handleCloseDialog} />}
      </Dialog>
    </div>
  );
};

export default WorkoutDetails;
