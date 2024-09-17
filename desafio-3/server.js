import "dotenv/config";
import os from "os";
import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  console.log("url: ", req.url);
  console.log("method: ", req.method);

  switch (req.url) {
    case "/alumno":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Vidal Javier - DWN4AV");
      break;

    case "/info":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Datos del sistema:\n
             Arquitectura: ${os.arch}\n
             CPUS: ${JSON.stringify(os.cpus())}\n`);
      break;

    case "/":
      try {
        res.writeHead(200, { "Content-Type": "text/html" });
        const data = await fs.readFile("index.html", "utf-8");
        res.end(data);
      } catch (error) {
        console.error("Error getting file: ", error.message);
      }
      break;
  }
});

server.listen(process.env.PORT, () => {
  console.log(`server hosted at: http://localhost:${process.env.PORT}`);
});
