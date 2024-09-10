import express from "express";
import 'dotenv/config';

const server = express();
server.get('/',(req,res)=>{
    res.send('Javier Vidal')
})
server.listen(process.env.PORT,()=>{
    console.log(`Server running at: http://localhost:${process.env.PORT}`);
})


