import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io'

const app = express();
const server = createServer(app);
const {io} = new Server(server);

app.use(express.static('public'));

app.get('/',(req, res)=>{
    res.sendFile('index.html');
})


server.listen(3000, ()=>{
    console.log('server is running on port 3000')
})