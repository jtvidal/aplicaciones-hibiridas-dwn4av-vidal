import express from "express";
import AuthorsController from "../controllers/authorsController.js";

const authorsRouter = express.Router();
authorsRouter.get("/", AuthorsController.getAuthors);
authorsRouter.get("/:id", AuthorsController.getAuthorById);
authorsRouter.post("/", AuthorsController.createAuthor);
authorsRouter.put("/:id", AuthorsController.editAuthor);
authorsRouter.delete("/:id", AuthorsController.deleteAuthor);
export default authorsRouter;
