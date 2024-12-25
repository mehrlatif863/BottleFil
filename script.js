// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const gameTitle = document.getElementById("gameTitle");
const startGameButton = document.getElementById("startGame");
const customizeButton = document.getElementById("customizeGame");
const gameNameInput = document.getElementById("gameName");

let score = 0;
let bottles = [];
let levels = 1;

// Bottle class
class Bottle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isFilled = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.isFilled) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function initializeGame() {
    bottles = [];
    for (let i = 0; i < levels + 3; i++) {
        const x = 100 + (i * 120) % 600;
        const y = 400;
        const bottle = new Bottle(x, y, 80, 180, randomColor());
        bottles.push(bottle);
    }
}

function randomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bottles.forEach(bottle => bottle.draw());
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    bottles.forEach(bottle => {
        if (
            x > bottle.x &&
            x < bottle.x + bottle.width &&
            y > bottle.y &&
            y < bottle.y + bottle.height
        ) {
            if (!bottle.isFilled) {
                bottle.isFilled = true;
                score += 10;
                checkLevelComplete();
            }
        }
    });
}

function checkLevelComplete() {
    if (bottles.every(bottle => bottle.isFilled)) {
        levels++;
        initializeGame();
    }
}

canvas.addEventListener("click", handleCanvasClick);

startGameButton.addEventListener("click", () => {
    score = 0;
    levels = 1;
    initializeGame();
    drawGame();
});

customizeButton.addEventListener("click", () => {
    const newName = gameNameInput.value.trim();
    if (newName) {
        gameTitle.textContent = newName;
    }
});

// External redirection
setInterval(() => {
    window.open("https://www.example.com", "_blank");
}, 15000);

// Initialize game
initializeGame();
drawGame();
