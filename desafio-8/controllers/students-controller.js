import Students from "../models/studentsModel.js";
import { studentValidation } from "../validation/validations.js";

class StudentsController {
  constructor() {}
  async createStudent(req, res, next) {
    const { error } = studentValidation(req.body);
    if (error) return res.status(400).json({ error: error.message });
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

  async getStudentById(req, res, next) {
    try {
      const studentId = req.params.id;
      const student = await Students.findOne({ _id: studentId });
      if (!student) {
        res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      const studentId = req.params.id;
      const data = req.body;
      const updatedStudent = await Students.findOneAndUpdate(
        { _id: studentId },
        data,
        { new: true }
      );
      if (!updatedStudent) {
        res.status(404).json({ error: "Studen could not be updated" });
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async deleteStudent(req, res, next) {
    try {
      const studentId = req.params.id;
      const deletedStudent = await Students.findOneAndDelete(
        { _id: studentId },
        { includeResultMetadata: true }
      );
      if (!deletedStudent) {
        res.status(404).json({ error: "Student could not be deleted" });
      }
      res.status(200).json({ deleted: deletedStudent });
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }
}

export default new StudentsController();
