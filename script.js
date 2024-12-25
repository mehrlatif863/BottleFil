const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const gameTitle = document.getElementById("gameTitle");
const startGameButton = document.getElementById("startGame");
const customizeButton = document.getElementById("customizeGame");
const gameNameInput = document.getElementById("gameName");

let score = 0;
let items = [];
let levels = 1;

// Item class for clothing
class Item {
    constructor(x, y, width, height, color, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.isSelected = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.isSelected) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

function initializeGame() {
    items = [];
    const colors = ["red", "blue", "green", "yellow", "pink", "purple"];
    const types = ["shirt", "shoes", "blouse", "trouser"];
    for (let i = 0; i < levels + 4; i++) {
        const x = 100 + (i * 120) % 600;
        const y = 200 + (i % 2) * 150;
        const item = new Item(
            x,
            y,
            100,
            50,
            colors[Math.floor(Math.random() * colors.length)],
            types[Math.floor(Math.random() * types.length)]
        );
        items.push(item);
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    items.forEach(item => item.draw());
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    items.forEach(item => {
        if (
            x > item.x &&
            x < item.x + item.width &&
            y > item.y &&
            y < item.y + item.height
        ) {
            if (!item.isSelected) {
                item.isSelected = true;
                score += 10;
                checkLevelComplete();
            }
        }
    });
}

function checkLevelComplete() {
    if (items.every(item => item.isSelected)) {
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
