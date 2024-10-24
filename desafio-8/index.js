import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnection } from "./config/db.config.js";

dotenv.config();
const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

server.listen(
  process.env.PORT,
  console.log(`Server Running at: http://localhost:${process.env.PORT}`)
);

dbConnection();
