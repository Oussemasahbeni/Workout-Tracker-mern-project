import express from "express";
import {
  loginUser,
  loginWithGoogle,
  signUpUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signUpUser);

router.post("/auth/google", loginWithGoogle);

export default router;
