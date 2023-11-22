import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
const requireAuth = async (req, res, next) => {
  // verify authentication
  // we get authorization from the headers
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "authorization required" });
  }
  // authorization is a string that contains the token
  let token;
  if (authorization) {
    //getting the token from the authorization string
    token = authorization.split(" ")[1];
    // console.log("Token is  : " + token);
  }

  try {
    // returns the id of the user that is in the token
    const { _id } = jwt.verify(token, process.env.SECRET);
    // console.log(" verification id is : " + _id);
    // console.log("id is : " + _id);
    // we get the user from the database and we add it to the request
    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};
export default requireAuth;
