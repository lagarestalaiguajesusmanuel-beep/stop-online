const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = [];
let letter = "";

const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function randomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

io.on("connection", (socket) => {

    console.log("Jugador conectado");

    players.push(socket.id);

    socket.on("startGame", () => {
        letter = randomLetter();
        io.emit("newRound", letter);
    });

    socket.on("stop", () => {
        io.emit("roundStopped");
    });

    socket.on("disconnect", () => {
        players = players.filter(p => p !== socket.id);
    });

});

server.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});