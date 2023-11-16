import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();
  const handleClick = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  //console.log(isLoading);
  return (
    <form className="signup" onSubmit={handleClick}>
      <div className="form-container">
        <h3>Sign up to Your Account</h3>
        <div className="input-container">
          <label>
            <span className="pi pi-user"></span> Email:
          </label>
          <InputText
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="input-container">
          <label>
            <span className="pi pi-lock"></span> Password:
          </label>
          <Password
            type="password"
            className="password-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            toggleMask
          />
        </div>
        <Button
          disabled={isLoading}
          className="signup-button"
          icon="pi pi-sign-in check-icon"
        >
          <span>Sign Up</span>
        </Button>
        {error && <div className="error"> {error}</div>}
      </div>
    </form>
  );
};

export default Signup;
