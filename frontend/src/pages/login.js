import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { Message } from "primereact/message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
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
    //console.log(email, password);
    await login(email, password);
  };
  return (
    <div className=" flex items-center justify-start bg-white border-8 rounded-3xl mt-3 ">
      <form
        className="form-container  h-auto  max-w-4xl    mx-auto p-20 m-8 ml-8 bg-violet-100  border-white border-2 rounded-3xl flex flex-col items-center"
        onSubmit={handleClick}
      >
        <h3>Login to Your Account</h3>
        {error && <Message data-testid="error" severity="error" text={error} />}
        <div className=" input-container mb-4">
          <label>
            <span className="pi pi-user"></span> Email:
          </label>
          <InputText
            type="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            data-testid="email-input"
          />
        </div>
        <div className=" input-container mb-4">
          <label>
            <span className="pi pi-lock"></span> Password:
          </label>
          <Password
            type="password"
            placeholder="password"
            className="w-full "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            toggleMask
            feedback={false}
            data-testid="password-input"
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          data-testid="login-button"
          className="w-52 p-2 text-form_title shrink-0 bg-sky-500 rounded-full text-lg flex items-center justify-center border-blue-500 border-4 text-center  hover:bg-violet-400"
          icon="pi pi-sign-in relative right-2"
        >
          <span className="font-semibold mr-2">Login</span>
        </Button>

        <div className="mt-4 ">
          <span> OR SIGN IN WITH GOOGLE</span>
          <GoogleLogin
            className="bg-red ma"
            
            onSuccess={responseMessage}
            onError={errorMessage}
            useOneTap
            shape={"circle"}
            theme={"filled_blue"}
          />
        </div>
        <NavLink to="/signup" className="text-blue-500 hover:underline mt-3">
          Don't have an account? Sign up here.
        </NavLink>
        {iserror && <div className="errorDiv">{iserror}</div>}
        {googleError && <div className="error">{googleError}</div>}
      </form>
      <img className=" max-w-xl mr-20" src="/background.png" alt="" />
    </div>
  );
};

export default Login;
