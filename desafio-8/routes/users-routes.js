import express from "express";
import usersController from "../controllers/users-controller.js";

const router = express.Router();
router.post("/", usersController.createUser);
router.get("/", usersController.getUsers);

export default router;
