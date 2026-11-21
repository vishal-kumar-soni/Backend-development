import express from 'express';
const app = express();
import {createServer} from 'node:http';
const server = createServer(app);


server.listen(3000, ()=>{
    console.log('server is running on port 3000')
})