import express from "express";
import usersController from "../controllers/usersController.js";
const usersRouter = express.Router();

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:id", usersController.editUser);
usersRouter.delete("/:id", usersController.deleteUser);

export default usersRouter;
