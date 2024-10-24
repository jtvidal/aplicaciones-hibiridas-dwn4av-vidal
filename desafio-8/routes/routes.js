import express from "express";
import usersRouter from "./users-routes.js";

const router = express.Router();

export async function routerHandler(app) {
  app.use("/desafio-ocho", router);
  router.use("/users", usersRouter);
}
