import express from "express";
import { login } from "../controllers/users/login.js";

import { checkEmail, signup } from "../controllers/users/signup.js";

const router = express.Router();

// User routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/checkemail", checkEmail);
export default router;
