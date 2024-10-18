import express from "express";
import authorsRouter from "./authorsRoutes.js";
import booksRouter from "./booksRouter.js";

const router = express.Router();
export function routerHandler(app) {
  app.use("/api", router);
  router.get("/authors", authorsRouter);
  router.get("/books", booksRouter);
}

export default routerHandler;
