import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import routerHandler from "./routes/routes.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

routerHandler(app);

app.listen(PORT, console.log(`http://localhost:${PORT}/api`));

app.get("/api", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
