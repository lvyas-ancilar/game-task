var character = document.getElementById("character");
var result = document.getElementById("result");
var game = document.getElementById("game");
var score = document.getElementById("score");

// Retrieve stored high score; default to 0 if none exists
var highScore = localStorage.getItem("highScore") || 0;

// Retrieve stored low score; default to Infinity (meaning no low score yet)
var lowScore = localStorage.getItem("lowScore");
lowScore = lowScore !== null ? Number(lowScore) : Infinity;

var count = 0;

// Ensure a placeholder for the low‑score display exists inside the result overlay
if (!document.getElementById("lowScore")) {
    const lowScoreEl = document.createElement("p");
    lowScoreEl.id = "lowScore";
    result.appendChild(lowScoreEl);
}

function jump() {
    // Simple jump animation (move up then down)
    character.style.top = "110px";
    setTimeout(function () {
        character.style.top = "170px";
    }, 500);

    // Increment the current session score
    count++;

    // Update high score if the current count exceeds it
    if (count > highScore) {
        highScore = count;
        localStorage.setItem("highScore", highScore);
    }

    // Update low score if the current count is lower than any previously recorded low score
    if (count < lowScore) {
        lowScore = count;
        localStorage.setItem("lowScore", lowScore);
    }

    // Show the current high score in the UI
    document.getElementById("highScore").innerHTML = `highScore is  : ${highScore}`;
}
window.addEventListener("keydown", jump);

var block = document.getElementById("block");

// Game‑over detection loop
setInterval(function gameOver() {
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    // Collision condition: block is near the character and the character is low enough
    if ((blockleft < 50) && (characterTop > 120)) {
        // Show the game‑over overlay
        result.style.display = "block";
        game.style.display = "none";

        // Display the final score for this session
        score.innerHTML = `Score is : ${count}`;

        // Also display the recorded low score (if any)
        // If lowScore is still Infinity (no low score recorded), show a friendly message
        const lowScoreDisplay = lowScore === Infinity ? "No low score yet" : lowScore;
        document.getElementById("lowScore").innerHTML = `Low Score is : ${lowScoreDisplay}`;
    }
}, 10);