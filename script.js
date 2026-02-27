// const dino = document.getElementById("dino");
// const cactus = document.getElementById("cactus");

// function jump() {
//   if (dino.classList != "jump") {
//     dino.classList.add("jump");

//     setTimeout(function () {
//       dino.classList.remove("jump");
//     }, 3000);
//   }
// }

// let isAlive = setInterval(function () {
  
//   let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
//   console.log(dinoTop);   

//   
//   let cactusLeft = parseInt(
//     window.getComputedStyle(cactus).getPropertyValue("left")
    
//   );
//   console.log(cactusLeft)

//   
//   if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
   
//     alert("Game Over!");
//   }
// }, 10);

// document.addEventListener("keydown", function (event) {
//   jump();
// });


// let score = 0;
// let scoreInterval = setInterval(function() {
//   score++;
//   document.getElementById("score").innerText = "Score: " + score;
// }, 1000);


// // function resetScore() {
// //   score = 0;
// //   document.getElementById("score").innerText = "Score: " + score;
// // }

// // document.addEventListener("keydown", function(event) {
// //   
// // }); 
var character = document.getElementById("character");
var result = document.getElementById("result");
var game = document.getElementById("game");
var score = document.getElementById("score");


var highScore = localStorage.getItem("highScore") || 0;
var count = 0;

// Low score system constants
const lowScoreThreshold = 5; // When lowScore falls below this, show cue
let lowScore = 0; // Will be initialized on first jump

function jump(){
    character.style.top = "110px";
    setTimeout(function(){
        character.style.top = "170px"   
    },500);
    
    count++;

    if(count > highScore){
        highScore = count;
        localStorage.setItem("highScore", highScore);
    }
    document.getElementById("highScore").innerHTML = `highScore is  : ${highScore}`;
    // Initialize lowScore on first jump if not set
    if (lowScore === 0) {
        lowScore = count;
    }
};

window.addEventListener("keydown", jump);

var block = document.getElementById("block");

setInterval(function gameLoop(){
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    // Collision detection (game over)
    if((blockleft < 50) && (characterTop > 120)){
        result.style.display = "block";
        result.innerHTML = "Game Over!";
        game.style.display = "none";
        score.innerHTML = `Score is : ${count}`;
        return; // stop further processing
    }
    // Obstacle pass detection (when block moves off-screen)
    if(blockleft < 0){
        // Decrement lowScore counter
        lowScore = Math.max(0, lowScore - 1);
        // Show low score visual cue if below threshold
        if(lowScore < lowScoreThreshold){
            result.style.display = "block";
            result.innerHTML = "Low Score!";
            // Note: Game continues; we do not hide the game area here
        }
    }
},10);



