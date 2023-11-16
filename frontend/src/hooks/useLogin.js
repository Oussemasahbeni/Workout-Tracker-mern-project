import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const user = { email, password };
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        user
      );
      const result = response.data;

      console.log(response);

      if (response.statusText === "OK") {
        setError(null);
        setIsLoading(false);
        // save the token in local storage
        localStorage.setItem("user", JSON.stringify(result));
        // update the dispatch
        dispatch({ type: "LOGIN", payload: result });
      }
    } catch (error) {
      const response = error.response.data;
      setError(response.message);

      //console.log(error);
    }
  };
  return { login, isLoading, error };
};
