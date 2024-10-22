import express from "express";
import AuthorsController from "../controllers/authorsController.js";
import { auth } from "../middlewares/auth.js";

const authorsRouter = express.Router();
authorsRouter.get("/",auth, AuthorsController.getAuthors);
authorsRouter.get("/:id",auth, AuthorsController.getAuthorById);
authorsRouter.post("/", AuthorsController.createAuthor);
authorsRouter.put("/:id", AuthorsController.editAuthor);
authorsRouter.delete("/:id", AuthorsController.deleteAuthor);
export default authorsRouter;
