import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// const movies = [
//   {
//     year: "1994",
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     photographyDirector: "Robert Richardson",
//     country: "USA",
//     actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
//   },
//   {
//     year: "1999",
//     title: "The Matrix",
//     director: "Lana Wachowski, Lilly Wachowski",
//     photographyDirector: "Bill Pope",
//     country: "USA",
//     actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
//   },
//   {
//     year: "2008",
//     title: "The Dark Knight",
//     director: "Christopher Nolan",
//     photographyDirector: "Wally Pfister",
//     country: "USA",
//     actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
//   },
//   {
//     year: "2010",
//     title: "Inception",
//     director: "Christopher Nolan",
//     photographyDirector: "Wally Pfister",
//     country: "USA",
//     actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
//   },
//   {
//     year: "2014",
//     title: "Interstellar",
//     director: "Christopher Nolan",
//     photographyDirector: "Hoyte van Hoytema",
//     country: "USA",
//     actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
//   },
// ];
const server = express();
server.use(express.json());

//Esto siguiente para poder utilizar __dirname en ES6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const dataURl = path.join(__dirname, "./data.json")
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

server.get("/peliculas/:title", (req, res) => {
  let filteredMovies = [];
  filteredMovies = data.movies.filter((m) =>
    m.title.toLowerCase().includes(req.params.title.toLowerCase())
  );
  if (filteredMovies.length >= 0) {
    console.log("pelis filtradas: ", filteredMovies);
    res.status(200).json(filteredMovies);
  } else {
    res.status(400).send("Movie not found");
  }
});

server.get('/productos', (req,res)=>{

});

server.listen(process.env.PORT, () => {
  console.log(`Server running at: http://localhost:${process.env.PORT}`);
});

// Middleware genérico: para rutas no definidas
server.use((req, res) => {
  res.status(404).json({ message: "Oops: page not found!" });
});
