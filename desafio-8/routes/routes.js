import express from "express";
import usersRouter from "./users-routes.js";
import studentsRouter from "./students-routes.js";
import coursesRouter from "./courses-routes.js";

const router = express.Router();

export async function routerHandler(app) {
  app.use("/desafio-ocho", router);
  router.use("/users", usersRouter);
  router.use("/students", studentsRouter);
  router.use("/courses", coursesRouter);
}
