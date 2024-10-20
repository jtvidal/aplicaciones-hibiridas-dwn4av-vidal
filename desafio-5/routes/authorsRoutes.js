import express from "express";
import AuthorController from "../controllers/authorController.js";

const authorsRouter = express.Router();
authorsRouter.get("/", AuthorController.getAuthors);
export default authorsRouter;
