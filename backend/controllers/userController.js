import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// create a jwt token function
const createToken = (_id) => {
  // sign takes 3 arguments , payload , secret , options, payload is the data we want to store in the token
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //console.log("Email is " + email, "Password is " + password);
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    console.log("token is " + token);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.signup(email, password);
    // create a token
    const token = createToken(user._id);
    console.log("token is " + token);
    res.status(201).json({ email, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
