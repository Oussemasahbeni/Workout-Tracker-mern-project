import express from "express";

import { calculateBMI } from "../controllers/calculateController.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.use(requireAuth);
router.post("/bmi", calculateBMI);

export default router;
