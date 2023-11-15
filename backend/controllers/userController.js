import mongoose from "mongoose";

import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// create a jwt token function
const createToken = (_id) => {
  // sign takes 3 arguments , payload , secret , options, payload is the data we want to store in the token
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.login({ email, password });
    res.status(200).json(result);
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
    res.status(201).json({ email, user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
