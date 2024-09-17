import express from "express";
import "dotenv/config";

const server = express();

server.get("/", (req, res) => {
  res.status(200).send("Javier Vidal");
});
server.get("/materia", (req, res) => {
  res.status(200).send("Aplicaciones Híbridas");
});
server.get("/profesora", (req, res) => {
  res.status(200).send("Camila Belén Marcos Galbán");
});
server.listen(process.env.PORT, () => {
  console.log(`Server running at: http://localhost:${process.env.PORT}`);
});


// Middleware genérico: para rutas no definidas
server.use((req, res) => {
  res.status(404).send("Oops: page not found!");
});
