import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnection } from "./config/db-config.js";
import { routerHandler } from "./routes/routes.js";

dotenv.config();
dbConnection();
const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

routerHandler(server);

server.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public"));
});

server.listen(
  process.env.PORT,
  console.log(`Server Running at: http://127.0.0.1:${process.env.PORT}`)
);
