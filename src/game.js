// src/game.js
// Dino Game implementation with Low Score tracking

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 150,
    width: 40,
    height: 40,
    dy: 0,
    gravity: 0.6,
    jumpStrength: -12,
    isJumping: false
};

let cactus = {
    x: 300,
    y: 160,
    width: 20,
    height: 40,
    speed: 6
};

let score = 0;

// Low Score handling
let lowScore = null;
const storedLow = localStorage.getItem('lowScore');
if (storedLow !== null) {
    lowScore = parseInt(storedLow, 10);
}

let gameOver = false;

function resetGame() {
    dino.y = 150;
    dino.dy = 0;
    dino.isJumping = false;
    cactus.x = 300;
    score = 0;
    gameOver = false;
    // lowScore persists across games
}

function update() {
    if (gameOver) return;

    // Dino physics
    dino.dy += dino.gravity;
    dino.y += dino.dy;
    if (dino.y > 150) {
        dino.y = 150;
        dino.dy = 0;
        dino.isJumping = false;
    }

    // Cactus movement
    cactus.x -= cactus.speed;
    if (cactus.x < -cactus.width) {
        cactus.x = canvas.width + Math.random() * 100;
        score++;
    }

    // Collision detection
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        gameOver = true;

        // Update low score if this run is lower
        if (lowScore === null || score < lowScore) {
            lowScore = score;
            localStorage.setItem('lowScore', lowScore);
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw dino
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Draw cactus
    ctx.fillStyle = 'brown';
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);

    // Draw current score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // Draw low score
    const lowScoreText = lowScore !== null ? lowScore : 'N/A';
    ctx.fillText('Low Score: ' + lowScoreText, 10, 55);

    // Game over message
    if (gameOver) {
        ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2);
    }
}

// Input handling
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && !dino.isJumping) {
        dino.dy = dino.jumpStrength;
        dino.isJumping = true;
    }
    if (e.code === 'KeyR' && gameOver) {
        resetGame();
        update();
    }
});

// Start the game loop
update();