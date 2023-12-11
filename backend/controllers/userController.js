import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
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
    console.log(user);
    const token = createToken(user._id);
    console.log("token is " + token);
    res.status(200).json({ email, token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signUpUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(username);
  try {
    const user = await userModel.signup(email, password, username);
    // create a token
    console.log(user);
    const token = createToken(user._id);
    // console.log("token is " + token);
    res.status(201).json({ email, token, username });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const loginWithGoogle = async (req, res) => {
  const id_token = req.body.response.credential;
  console.log(req.body.response);

  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  //console.log(payload);
  const userid = payload["sub"];

  // Find the user in your MongoDB database
  let user = await userModel.findOne({ googleId: userid });

  // If the user doesn't exist, create a new user
  if (!user) {
    user = new userModel({
      googleId: userid,
      email: payload.email,
      username: payload.name,
    });
    await user.save();
  }

  // Create a JWT for the user
  const token = createToken(user._id);
  console.log("token is " + token);
  //console.log(user.id, token);

  // Send the JWT back to the client
  res.json({ email: user.email, token, username: user.username });
};
