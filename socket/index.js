import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/',(req, res)=>{
    res.sendFile('index.html');
})

io.on('connection', (socket)=>{ // socket = client who wants to connect with server. When this request comes in the server , the connection between client and server is authomatically established.
    console.log(`A new user connected ${socket.id}`); // This is the id of client who wants to connect with server.
    // socket.on('disconnect', ()=>{
    //     console.log('user disconnected');
    // })
    // socket.on('chat message', (msg)=>{
    //     console.log('message: ' + msg);
    //     io.emit('chat message', msg);
    // })
    // socket.on('typing', (msg)=>{
    //     console.log('typing: ' + msg);
})

server.listen(3000, ()=>{
    console.log('server is running on port 3000')
})