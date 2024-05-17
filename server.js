import express from "express";
import http from "http";
import ip from "ip";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const PORT = 3001;
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/game.html", (req, res) => {
    res.sendFile(__dirname + "/public/game.html");
});

io.on("connection", (socket) => {
    console.log("(server) a user connected");
    socket.broadcast.emit("user connected");

    socket.on("disconnect", () => {
        console.log("(server) user disconnected");
        socket.broadcast.emit("user disconnected");
    });

    socket.on("message", (msg) => {
        console.log("(server) message: " + msg);
        io.emit("message", msg);
    });

    socket.on("room", (room, msg) => {
        console.log("(server) room: " + room + " message: " + msg);
        io.to(room).emit("message", msg);
    });

    socket.on("join", (room) => {
        console.log("(server) join room: " + room);
        socket.join(room);
        io.to(room).emit("join", room);
    });

    socket.on("leave", (room) => {
        console.log("(server) leave room: " + room);
        socket.leave(room);
        io.to(room).emit("leave", room);
    });

    socket.on("draw", (data) => {
        const room = data.room;
        console.log(`Draw event in room ${room}:`, data);
        if (room) {
            io.to(room).emit("draw", data);
        }
    });

    socket.on("clearCanvas", (data) => {
        const room = data.room;
        console.log(`Clear canvas event in room ${room}`);
        if (room) {
            io.to(room).emit("clearCanvas");
        }
    });

    socket.on("selectedWordToServer", (data) => {
        console.log('selected words', data);
        const room = data.room;
        if (room) {
            console.log(`Selected word in room ${room}: ${data.word}`);
            io.to(room).emit("selectedWord", data.word);
        }
    });

    socket.on("role", (data) => {
        const room = Array.from(socket.rooms)[1];
        if (room) {
            io.to(room).emit("role", data);
        }
    });
});

server.listen(PORT, () => {
    console.log("Server ip : http://" + ip.address() + ":" + PORT);
});