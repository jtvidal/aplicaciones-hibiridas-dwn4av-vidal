import "dotenv/config";
import os from "os";
import http from "http";
import fs from "fs/promises";

const server = http.createServer((req, res) => {
  console.log("url: ", req.url);
  console.log('method: ', req.method);
  switch(req.url){
    case '/alumno':
        res.writeHead(200, 'text/plain')
        res.end('Vidal Javier');
        
    case '/info':
        res.writeHead(200,'text/plain')
        res.end(`Datos del sistema:
             Arquitectura: ${os.arch}\n
             Hostname: ${os.hostname}`);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`server port: ${process.env.PORT}`);
});
