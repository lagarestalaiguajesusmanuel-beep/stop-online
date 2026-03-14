const socket = io();

const letterSpan = document.getElementById("letter");

document.getElementById("start").onclick = () => {
    socket.emit("startGame");
};

document.getElementById("stop").onclick = () => {
    socket.emit("stop");
};

socket.on("newRound", (letter) => {
    letterSpan.innerText = letter;
});

socket.on("roundStopped", () => {
    alert("¡Alguien presionó STOP!");
});