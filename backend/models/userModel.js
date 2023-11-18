import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    userName: { type: String },
    googleId: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    username: { type: String },
  },
  { timestamps: true }
);

//static signup method

// we use statics because we want to create a method on the model itself and not on the instance of the model
userSchema.statics.signup = async function (email, password) {
  //!validation

  // test if email and password are provided
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  // testing if email is valid
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid, please enter a valid email address");
  }
  // testing if password is strong enough
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough, please enter a stronger password"
    );
  }
  // this === model, we use this because we didnt create a model yet

  // testing if email already exists
  const emailexists = await this.findOne({ email });
  if (emailexists) {
    throw new Error("User with this email already exists");
  }
  // generate salt for hashing , salt is a random string added to the password to make it more secure
  // 10 is the number of rounds , the more rounds the more secure but slower
  const salt = await bcrypt.genSalt(10);
  // hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await this.findOne({ email });
  console.log("email found");
  if (!user) {
    throw new Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }
  return user;
};

export const userModel = model("User", userSchema);
