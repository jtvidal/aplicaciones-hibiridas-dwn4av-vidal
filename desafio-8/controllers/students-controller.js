import Students from "../models/studentsModel.js";

class StudentsController {
  constructor() {}

  async getStudents(req, res, next) {
    try {
      const students = await Students.find();
      if (!students) {
        res.status(404).json({ error: "Students not found" });
      }
      res.status(200).json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async createStudent(req, res, next) {
    try {
      const newStudent = new Students({ ...req.body });
      const savedStudent = await newStudent.save();
      if (!savedStudent) {
        res.status(400).json({ error: "Could not save Student in database" });
      } else {
        res.status(201).json(savedStudent);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentsController();
