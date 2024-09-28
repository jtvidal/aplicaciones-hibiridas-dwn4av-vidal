import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { type } from "os";

const server = express();
server.use(express.json());

//Esto para poder utilizar __dirname en ES6
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dataURl = path.join(__dirname, "./data.json");
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

/**
 * Recieves a value and validates its of type number.
 * Returns Error
 * @param  n
 * @param {Response} response
 * @returns {Error}
 */
export function validateNumber(n, response) {
  if (isNaN(parseInt(n))) {
    response.status(400).send("Error: query value must be a number");
    return false;
  }
  return true;
}
server.get("/", (req, res) => {
  res.status(200).send("Javier Vidal");
});

server.get("/materia", (req, res) => {
  res.status(200).send("Aplicaciones Híbridas");
});

server.get("/profesora", (req, res) => {
  res.status(200).send("Camila Belén Marcos Galbán");
});

//PELICULAS
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

// PRODUCTOS
server.get("/productos", (req, res) => {
  const { max, min } = req.query;
  if (!max && !min) {
    console.log("query: ", req.query);
    res.status(200).json(data.products);
    return;
  }
  if (!max && min) {
    console.log(isNaN(parseInt(min)));
    if (!validateNumber(min, res)) return;
    const minPrice = data.products.filter((p) => p.precio >= parseInt(min));
    console.log(minPrice);
    res.status(200).json(minPrice);
  } else if (max && !min) {
    if (!validateNumber(max, res)) return;
    const maxPrice = data.products.filter((p) => p.precio <= parseInt(max));
    res.status(200).json(maxPrice);
  } else {
    console.log("maxmin");
    const maxMin = data.products.filter(
      (p) => p.precio >= parseInt(min) && p.precio <= parseInt(max)
    );
    res.status(200).json(maxMin);
  }
});

//PRODUCTOS X ID
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
