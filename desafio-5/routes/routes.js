import express from "express";
import authorsRouter from "./authorsRoutes.js";
import booksRouter from "./booksRoutes.js";
import usersRouter from './usersRoutes.js'

const router = express.Router();
export function routerHandler(app) {
  app.use("/api", router);
  router.use("/authors", authorsRouter);
  router.use("/books", booksRouter);
  router.use("/users", usersRouter);
}

export default routerHandler;
