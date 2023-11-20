import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import EditWorkout from "./EditWorkout";
import { useRef } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

// we get the workout as a prop from the parent component
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [visible, setVisible] = useState(false);

  const toast = useRef(null);

  const accept = async () => {
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
    // const result = response.data;

    if (response.status === 200) {
      const result = response.data;
      dispatch({ type: "DELETE_WORKOUT", payload: result });
    }
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const handleClick = async () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
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
      <Toast ref={toast} />
      <ConfirmDialog className="p-7" />
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

      <Button
        className="material-symbols-outlined absolute top-4 right-4 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-700"
        onClick={handleClick}
      >
        Delete
      </Button>
      <Button
        className="material-symbols-outlined absolute top-16 right-4 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-700"
        onClick={handleEdit}
      >
        Edit
      </Button>

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
