import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const handleClick = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <form className="login" onSubmit={handleClick}>
      <div className="form-container">
        <h3>Login to Your Account</h3>
        <div className="input-container">
          <label>
            <span className="pi pi-user"></span> Email:
          </label>
          <InputText
            type="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            toggleMask
            feedback={false}
          />
        </div>
        <Button
          disabled={isLoading}
          className="signup-button"
          icon="pi pi-sign-in check-login"
        >
          <span>Login</span>
        </Button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;
