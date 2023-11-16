import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

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
      <h3>Sign up</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button disabled={isLoading}> Sign Up</button>
      {error && <div className="error"> {error}</div>}
    </form>
  );
};

export default Signup;
