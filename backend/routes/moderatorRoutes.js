import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserById,
  updateUserByModerator,
} from "../controllers/userController.js";
import { protect, moderator } from "../middleware/authMiddlware.js";

router.route("/").get(protect, moderator, getUsers);

router
  .route("/:id")
  .get(protect, moderator, getUserById)
  .put(protect, moderator, updateUserByModerator);

export default router;
