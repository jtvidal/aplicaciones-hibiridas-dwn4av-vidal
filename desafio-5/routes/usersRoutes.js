import express from "express";
import usersController from "../controllers/usersController.js";
import { auth } from "../middlewares/auth.js";
const usersRouter = express.Router();

usersRouter.get("/",auth, usersController.getUsers);
usersRouter.get("/:id",auth, usersController.getUserById);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:id", usersController.editUser);
usersRouter.delete("/:id", usersController.deleteUser);
usersRouter.post('/login', usersController.loginUser);

export default usersRouter;
