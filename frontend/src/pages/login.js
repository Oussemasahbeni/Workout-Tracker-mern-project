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
        <div className="w-full mb-4">
          <label>
            <span className="pi pi-user"></span> Email:
          </label>
          <InputText
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full mb-4">
          <label>
            <span className="pi pi-lock"></span> Password:
          </label>
          <Password
            type="password"
            className="w-full "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            toggleMask
            feedback={false}
          />
        </div>
        <Button
          disabled={isLoading}
          className="w-52 p-2 text-form_title bg-yellow-400 rounded-full text-lg flex items-center justify-center border-blue-500 border-4 text-center  hover:bg-yellow-100"
          icon="pi pi-sign-in relative right-2"
        >
          <span className="font-semibold mr-2">Login</span>
        </Button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;
