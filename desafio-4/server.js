import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const server = express();
server.use(express.json());

//Esto para poder utilizar __dirname en ES6
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dataURl = path.join(__dirname, "./data.json");
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

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

    return res.status(200).json(data.products);
  }
  if (!max) {
    console.log(typeof parseInt(min));
    if (typeof parseInt(min) !== "number") {
      return res
        .status(400)
        .send(`Error: min query must be a number ${typeof parseInt(min)}`);
    }
    const minPrice = data.products.filter((p) => p.precio >= parseInt(min));
    console.log(minPrice);

    return res.status(200).json(minPrice);
  } else {
    if (typeof parseInt(max) != "number") {
      return res.status(400).send("Error: max query must be a number");
    }
    const maxPrice = data.products.filter((p) => p.precio <= parseInt(max));
    return res.status(200).json(maxPrice);
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
