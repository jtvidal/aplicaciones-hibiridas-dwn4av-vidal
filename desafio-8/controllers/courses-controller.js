import Courses from "../models/coursesModel.js";
import Students from "../models/studentsModel.js";
import Suscription from "../models/suscriptionModel.js";
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

  async updateCourse(req, res, next) {
    try {
      const data = req.body;
      const courseId = req.params.id;
      const course = await Courses.findByIdAndUpdate(courseId, data, {
        new: true,
      });
      if (!course) {
        res.status(404).json({ error: "Could not update course" });
      }
      res.status(200).json({ course });
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const course = await Courses.findByIdAndDelete(courseId, {
        includeResultMetadata: true,
      });
      console.log("deleted course: ", course);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  //SUSCRIPTION
  async suscription(req, res, next) {
    try {
      const courseId = req.params.id;
      const suscriberId = req.query.suscriber;
      const suscription = await new Suscription({
        courseId,
        suscriberId,
      }).save();
      const student = await Students.findById(suscriberId);
      const course = await Courses.findById(courseId);
      if (!course && !student) {
        res.status(404).json({ error: "Could not Suscribe to course" });
      }
      course.students.push(suscription);
      student.courses.push(suscription);

      const updatedCourse = await Courses.findByIdAndUpdate(courseId, course, {
        new: true,
      });
      const updatedStudent = await Students.findByIdAndUpdate(
        suscriberId,
        student,
        {
          new: true,
        }
      );
      res.status(200).json({ course: updatedCourse, student: updatedStudent });
    } catch (error) {
      res.status(400).json({ error: error });
      next(error);
    }
  }
}

export default new CoursesController();
