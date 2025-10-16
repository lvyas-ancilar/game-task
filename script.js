const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  console.log(dinoTop);   

  
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
    
  );
  console.log(cactusLeft)

  
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
   
    alert("Game Over!");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});


let score = 0;
let scoreInterval = setInterval(function() {
  score++;
  document.getElementById("score").innerText = "Score: " + score;
}, 1000);


function resetScore() {
  score = 0;
  document.getElementById("score").innerText = "Score: " + score;
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") { 
    resetScore();
  }
}); 