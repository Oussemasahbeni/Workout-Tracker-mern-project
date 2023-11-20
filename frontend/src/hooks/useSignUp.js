import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const notify = () => {
    toast.success("Signup Successful, Welcome!");
  };
  const signup = async (email, password, username) => {
    setIsLoading(true);
    setError(null);

    const user = { email, password, username };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        user
      );
      const result = response.data;
      // if (response.status === 500) {
      //   setError(result.error.message);
      //   setIsLoading(false);
      // }
      if (response.status === 201) {
        setError(null);
        setIsLoading(false);
        notify();
        // save the token in local storage
        localStorage.setItem("user", JSON.stringify(result));
        // update the dispatch
        dispatch({ type: "LOGIN", payload: result });
      }
    } catch (error) {
      const response = error.response.data;
      setError(response.message);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, setError };
};
