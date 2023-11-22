import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGIN_WITH_GOOGLE":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("user")) || null;

  const [state, dispatch] = useReducer(authReducer, { user: initialState });

  console.log("authContext state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
