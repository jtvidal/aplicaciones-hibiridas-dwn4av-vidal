import express from "express";
import bookController from "../controllers/bookController.js";

const booksRouter = express.Router();
booksRouter.get("/", bookController.getBooks);
export default booksRouter;
