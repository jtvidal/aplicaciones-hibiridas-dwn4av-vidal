import express from "express";
import authorsRouter from "./authorsRoutes.js";
import booksRouter from "./booksRoutes.js";

const router = express.Router();
export function routerHandler(app) {
  app.use("/api", router);
  router.use("/authors", authorsRouter);
  router.use("/books", booksRouter);
}

export default routerHandler;
