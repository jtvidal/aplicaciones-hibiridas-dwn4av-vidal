import express from "express";
import booksController from "../controllers/booksController.js";

const booksRouter = express.Router();
booksRouter.get("/", booksController.getBooks);
booksRouter.get("/:id", booksController.getBooksById)
booksRouter.post('/',booksController.createBook);
booksRouter.put('/:id', booksController.editBook);
booksRouter.delete('/:id', booksController.deleteBook);
export default booksRouter;
