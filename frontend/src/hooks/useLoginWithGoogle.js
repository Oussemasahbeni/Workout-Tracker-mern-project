import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
// Import the useToast hook

export const useLoginWithGoogle = () => {
  const [iserror, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const notify = () => {
    toast.success("Login Successful, Welcome!");
  };
  const loginWithGoogle = async (response) => {
    console.log(response);

    // console.log(response);
    try {
      const result = await axios.post(
        "http://localhost:4000/api/user/auth/google",
        {
          response,
        }
      );

      // console.log(result.data);
      if (result.statusText === "OK") {
        setError(null);
        notify();
        // save the token in local storage
        localStorage.setItem("user", JSON.stringify(result.data));
        // update the dispatch
        dispatch({ type: "LOGIN_WITH_GOOGLE", payload: result.data });
      }
    } catch (error) {
      const response = error.response.data;
      setError(response.message);
    }
  };

  return { loginWithGoogle, iserror };
};
