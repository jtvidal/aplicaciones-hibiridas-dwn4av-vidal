import express from 'express'
import coursesController from '../controllers/courses-controller.js';

const coursesRouter = express.Router();

coursesRouter.get('/', coursesController.getCourses);
coursesRouter.post('/', coursesController.createCourse);

export default coursesRouter;