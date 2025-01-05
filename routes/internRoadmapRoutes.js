import express from "express";
import {
  getAllRoadmaps,
  getRoadmapByDay,
  getRoadmapByType,
} from "../controllers/internRoadmapController.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";
import { getRoadmapByRoleAndDay } from "../controllers/internRoadmapController.js";
const router = express.Router();

// Route to get all roadmaps
router.get("/", authenticateJWT, getAllRoadmaps);

// Route to get roadmap by day
router.get("/day/:day", authenticateJWT, getRoadmapByDay);

// Route to get roadmap by type
router.get("/type/:type", authenticateJWT, getRoadmapByType);
router.get("/type/:type/day/:day", authenticateJWT, getRoadmapByRoleAndDay);
export default router;
