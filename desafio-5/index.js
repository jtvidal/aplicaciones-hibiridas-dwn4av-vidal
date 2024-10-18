import express from "express";
import dotenv from "dotenv";
import routerHandler from "./routes/routes.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

routerHandler(app);

app.listen(PORT, `http://localhost:${PORT}/api`);
