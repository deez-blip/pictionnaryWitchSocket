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
        origin: "https://pictionaryWithSocket-1.onrender.com",
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

let rooms = {};

function assignDrawer(room) {
    if (rooms[room].players.length < 2) return;

    const currentDrawerIndex = rooms[room].currentDrawerIndex;
    const players = rooms[room].players;

    io.to(players[currentDrawerIndex].id).emit("role", { role: "drawer", username: players[currentDrawerIndex].username });
    players.forEach((player, index) => {
        if (index !== currentDrawerIndex) {
            io.to(player.id).emit("role", { role: "guesser", username: player.username });
        }
    });
}

io.on("connection", (socket) => {
    console.log("(server) a user connected");

    socket.on("join", (room, username) => {
        socket.join(room);
        socket.username = username; // Stocker le nom d'utilisateur dans la socket
        if (!rooms[room]) {
            rooms[room] = { players: [], currentDrawerIndex: 0, selectedWord: '' };
        }
        rooms[room].players.push({ id: socket.id, username });

        if (rooms[room].players.length >= 2) {
            assignDrawer(room);
        }
        console.log(`(server) user ${username} joined room: ${room}`);
    });

    socket.on("leave", (room) => {
        socket.leave(room);
        if (rooms[room]) {
            rooms[room].players = rooms[room].players.filter(player => player.id !== socket.id);
            if (rooms[room].players.length < 2) {
                rooms[room].currentDrawerIndex = 0; // Réinitialiser l'index du dessinateur
            }
        }
        console.log(`(server) user left room: ${room}`);
    });

    socket.on("disconnect", () => {
        console.log("(server) user disconnected");
        for (let room in rooms) {
            rooms[room].players = rooms[room].players.filter(player => player.id !== socket.id);
            if (rooms[room].players.length < 2) {
                rooms[room].currentDrawerIndex = 0;
            }
        }
    });

    socket.on("wordGuessed", (room) => {
        rooms[room].currentDrawerIndex = (rooms[room].currentDrawerIndex + 1) % rooms[room].players.length;
        assignDrawer(room);
    });

    socket.on("message", (msg) => {
        console.log("(server) message: " + msg);
        io.emit("message", msg);
    });

    socket.on("room", (room, msg) => {
        console.log("(server) room: " + room + " message: " + msg);
        io.to(room).emit("message", msg);
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
        const room = data.room;
        const word = data.word;
        if (room) {
            rooms[room].selectedWord = word; // Stocker le mot sélectionné
            console.log(`Selected word in room ${room}: ${word}`);
            rooms[room].players.forEach((player) => {
                const payload = { word, username: socket.username };
                io.to(player.id).emit("selectedWord", payload);
            });
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
