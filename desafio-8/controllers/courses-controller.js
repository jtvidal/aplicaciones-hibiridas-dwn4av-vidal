import Courses from "../models/coursesModel.js";
import { courseValidation } from "../validation/validations.js";

class CoursesController {
  constructor() {}

  async createCourse(req, res, next) {
    const { error } = courseValidation(req.body);
    if (error) return res.status(400).json({ error: error.message });
    try {
      const newCourse = new Courses({ ...req.body });
      const savedCourse = await newCourse.save();
      if (!savedCourse) {
        res.status(400).json({ error: "Could not create Course" });
      }
      res.status(201).json(savedCourse);
    } catch (error) {
      next(error);
    }
  }

  async getCourses(req, res, next) {
    try {
      const courses = await Courses.find();
      if (!courses) {
        res.status(404).json({ error: "Courses not found" });
      }
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
}

export default new CoursesController();
