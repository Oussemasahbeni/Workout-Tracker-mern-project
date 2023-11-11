import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes/workouts.js";
import mongoose from "mongoose";
import cors from "cors";

// express app
const app = express();
const workoutRoutes = router;
// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

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
