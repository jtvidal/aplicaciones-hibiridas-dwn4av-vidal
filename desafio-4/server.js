import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const server = express();
server.use(express.json());

//Esto para poder utilizar __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataURl = path.join(__dirname, "./data.json");
const data = JSON.parse(fs.readFileSync(dataURl));

server.get("/", (req, res) => {
  res.status(200).send("Javier Vidal");
});

server.get("/materia", (req, res) => {
  res.status(200).send("Aplicaciones Híbridas");
});

server.get("/profesora", (req, res) => {
  res.status(200).send("Camila Belén Marcos Galbán");
});

server.get("/peliculas", (req, res) => {
  res.status(200).json(data.movies);
});

server.get("/peliculas/:title", (req, res) => {
  let filteredMovies = [];
  filteredMovies = data.movies.filter((m) =>
    m.title.toLowerCase().includes(req.params.title.toLowerCase())
  );
  if (filteredMovies.length >= 0) {
    res.status(200).json(filteredMovies);
  } else {
    res.status(400).send("Movie not found");
  }
});

server.get("/productos", (req, res) => {
  res.status(200).json(data.products);
});

server.get("/productos/:id", (req, res) => {
  const product = data.products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(400).json({ message: "Product not found" });
  }
  res.status(200).json({ product });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at: http://localhost:${process.env.PORT}`);
});

// Middleware genérico: para rutas no definidas
server.use((req, res) => {
  res.status(404).send("Oops: page not found!");
});
