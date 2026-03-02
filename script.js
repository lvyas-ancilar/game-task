// Game elements
var character = document.getElementById("character");
var result = document.getElementById("result");
var game = document.getElementById("game");
var score = document.getElementById("score");
var startBtn = document.getElementById("startBtn");

var highScore = localStorage.getItem("highScore") || 0;
var count = 0;
var gameInterval; // will hold the collision check interval

function jump() {
    character.style.top = "110px";
    setTimeout(function () {
        character.style.top = "170px";
    }, 500);

    count++;
    if (count > highScore) {
        highScore = count;
        localStorage.setItem("highScore", highScore);
    }
    document.getElementById("highScore").innerHTML = `highScore is  : ${highScore}`;
}

function gameOver() {
    var block = document.getElementById("block");
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (blockleft < 50 && characterTop > 120) {
        clearInterval(gameInterval);
        result.style.display = "block";
        game.style.display = "none";
        score.innerHTML = `Score is : ${count}`;
    }
}

function startGame() {
    // Hide start button and show game area
    if (startBtn) startBtn.style.display = "none";
    if (game) game.style.display = "block";
    // Attach jump listener
    window.addEventListener("keydown", jump);
    // Start collision detection loop
    gameInterval = setInterval(gameOver, 10);
}

// Ensure result and game are hidden initially (handled via HTML inline styles)
