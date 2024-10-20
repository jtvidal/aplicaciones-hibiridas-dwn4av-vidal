import express from "express";
import bookController from "../controllers/bookController.js";

const booksRouter = express.Router();
booksRouter.get("/", bookController.getBooks);
booksRouter.get("/:id", bookController.getBooksById)
booksRouter.post('/',bookController.createBook);
booksRouter.put('/:id', bookController.editBook);
booksRouter.delete('/:id', bookController.deleteBook);
export default booksRouter;
