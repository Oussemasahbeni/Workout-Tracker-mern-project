import dotenv from "dotenv";
dotenv.config();

import express from "express";
import workoutRouter from "./routes/workouts.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import passportSetup from "./middleware/passport.js";
// express app
const app = express();
const workoutRoutes = workoutRouter;
const userRoutes = userRouter;
// middleware
app.use(express.json());
app.use(cors());

// app.use(
//   cookieSession({
//     name: "session",
//     keys: process.env.COOKIE_KEY,
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to db successfully,Server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
// listen for requests
