import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { Message } from "primereact/message";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();

  const { loginWithGoogle, iserror } = useLoginWithGoogle();
  const [googleError, setGoogleError] = useState(null);

  const responseMessage = async (response) => {
    await loginWithGoogle(response);
  };

  const errorMessage = (error) => {
    if (error.error === "popup_closed_by_user") {
      setGoogleError("You closed the Google sign in popup without signing in.");
    } else {
      setGoogleError("An error occurred while signing in with Google.");
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  //console.log(isLoading);
  return (
    <div className="flex items-center justify-start   bg-slate-100 border-8 border-blue-400 rounded-3xl mt-3">
      <form className="form-container " onSubmit={handleClick}>
        <h3>Sign up to Your Account</h3>
        {error && <Message severity="error" text={error} />}

        <div className=" input-container  mb-4">
          <label>
            <span className="pi pi-user"></span> Email:
          </label>
          <InputText
            type="email"
            placeholder="email@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="input-container mb-4">
          <label>
            <span className="pi pi-lock"></span> Password:
          </label>
          <Password
            className=" password w-full  m-0 p-0"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            toggleMask
          />
        </div>
        <Button
          disabled={isLoading}
          className="w-52 p-2 text-form_title shrink-0 bg-cyan-200 rounded-full text-lg flex items-center justify-center border-blue-500 border-4 text-center hover:bg-yellow-100"
          icon="pi pi-user-plus relative right-2"
        >
          <span className="font-semibold mr-2">Sign Up</span>
        </Button>
        <span className="mt-4"> OR SIGN UP WITH GOOGLE</span>
        <div className=" mr-1 mt-4 ">
          <GoogleLogin
            className="bg-red ma"
            onSuccess={responseMessage}
            onError={errorMessage}
            useOneTap
            shape={"circle"}
            theme={"filled_blue"}
          />
        </div>
        <NavLink to="/login" className="text-blue-500 hover:underline mt-3">
          Already have an account? Login here.
        </NavLink>

        {iserror && <div className="error">{iserror}</div>}
        {googleError && <div className="error">{googleError}</div>}
      </form>

      <img className=" max-w-xl mr-20" src="/workoutSignup.png" alt="" />
    </div>
  );
};

export default Signup;
