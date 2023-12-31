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
import { Toast } from "primereact/toast";

import "primereact/resources/themes/lara-light-indigo/theme.css";
// we get the workout as a prop from the parent component
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null);

  const handleDelete = async () => {
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

    if (response.status === 200) {
      const result = response.data;
      dispatch({ type: "DELETE_WORKOUT", payload: result });
    }
  };

  const reject = () => {
    console.log(toast);
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const handleClick = () => {
    setDialogVisible(true);
  };

  const handleAccept = async () => {
    await handleDelete();

    setDialogVisible(false);
  };

  const handleReject = () => {
    reject();
    setDialogVisible(false);
  };

  const handleEdit = () => {
    if (!user) {
      return;
    }
    setVisible(true);
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };
  return (
    <div
      data-testid="workout-list"
      className="bg-header_bg rounded mx-auto my-5 p-5 relative shadow-md"
    >
      <Toast ref={toast} />
      <ConfirmDialog
        visible={dialogVisible}
        data-test="delete-dialog"
        onHide={() => setDialogVisible(false)}
        message="Do you want to delete this workout?"
        header="Delete Confirmation"
        icon="pi pi-info-circle"
        acceptClassName="p-button-danger"
        accept={handleAccept}
        reject={handleReject}
      />
      <h4 className=" text-primary text-lg mb-3"> {workout.title}</h4>
      <p className="m-0, text-gray-700">
        <strong>Load(kg):</strong> {workout.load}
      </p>
      <p className="m-0, text-gray-700">
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p className="m-0, text-gray-700">
        <strong>Sets:</strong> {workout.sets}
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
        data-testid="delete-button"
      >
        Delete
      </Button>
      <Button
        className="material-symbols-outlined absolute top-16 right-4 cursor-pointer bg-gray-200 p-2 rounded-full text-gray-700"
        onClick={handleEdit}
        data-testid="edit-button"
      >
        Edit
      </Button>

      <Dialog
        visible={visible}
        data-testid="edit-dialog"
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {<EditWorkout workout={workout} onCloseDialog={handleCloseDialog} />}
      </Dialog>
    </div>
  );
};

export default WorkoutDetails;
