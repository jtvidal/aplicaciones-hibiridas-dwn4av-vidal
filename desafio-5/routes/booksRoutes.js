import express from "express";
import booksController from "../controllers/booksController.js";
import { auth } from "../middlewares/auth.js";

const booksRouter = express.Router();
booksRouter.get("/",auth, booksController.getBooks);
booksRouter.get("/:id",auth, booksController.getBooksById)
booksRouter.post('/',booksController.createBook);
booksRouter.put('/:id', booksController.editBook);
booksRouter.delete('/:id', booksController.deleteBook);
export default booksRouter;
