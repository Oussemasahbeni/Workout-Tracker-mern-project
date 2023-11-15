import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    username: { type: String },
  },
  { timestamps: true }
);

//static signup method

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
    throw new Error(
      "Password is not strong enough, please enter a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
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

export const userModel = model("User", userSchema);
