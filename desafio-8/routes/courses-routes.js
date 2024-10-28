import express from "express";
import coursesController from "../controllers/courses-controller.js";

const coursesRouter = express.Router();

coursesRouter.get("/", coursesController.getCourses);
coursesRouter.post("/", coursesController.createCourse);
coursesRouter.put("/:id", coursesController.updateCourse);
coursesRouter.delete("/:id", coursesController.deleteCourse);

export default coursesRouter;
