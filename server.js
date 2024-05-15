import express from 'express';
import http from 'http';
import ip from 'ip';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const PORT = 3001;
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.json('ip address: http://' + ip.address() + ':' + PORT);    
});

io.on('connection', (socket) => {
    console.log('(server) a user connected');
    socket.broadcast.emit('user connected');

    socket.on('disconnect', () => {
        console.log('(server) user disconnected');
        socket.broadcast.emit('user disconnected');
    });

    socket.on('message', (msg) => {
        console.log('(server) message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('room', (room, msg) => {
        console.log('(server)room: ' + room + ' message: ' + msg);
        io.to(room).emit('message', msg);
    });

    socket.on('join', (room) => {
        console.log('(server) join room: ' + room);
        socket.join(room);
        io.to(room).emit('join', room);
    });

    socket.on('leave', (room) => {
        console.log('(server) leave room: ' + room);
        socket.leave(room);
        io.to(room).emit('leave', room);
    });
});

server.listen(PORT, () => {
    console.log('Server ip : http://' + ip.address() + ":" + PORT);
});
