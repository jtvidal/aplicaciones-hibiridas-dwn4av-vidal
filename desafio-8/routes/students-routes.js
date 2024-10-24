import express from "express";
import studentsController from "../controllers/students-controller.js";

const studentsRouter = express.Router();

studentsRouter.get("/", studentsController.getStudents);
studentsRouter.post("/", studentsController.createStudent);

export default studentsRouter;
