import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { WorkoutContextProvider } from "./context/workoutContext";
import { AuthContextProvider } from "./context/authContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_ClIENT_ID}>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
