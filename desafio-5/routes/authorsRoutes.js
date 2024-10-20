import express from "express";
import AuthorController from "../controllers/authorController.js";

const authorsRouter = express.Router();
authorsRouter.get("/", AuthorController.getAuthors);
authorsRouter.get("/:id", AuthorController.getAuthorById);
authorsRouter.post("/", AuthorController.createAuthor);
authorsRouter.put("/:id", AuthorController.editAuthor);
authorsRouter.delete("/:id", AuthorController.deleteAuthor);
export default authorsRouter;
