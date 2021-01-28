let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";
let can = document.querySelector("canvas");
can.style.position = "absolute";
can.style.top = "30px";
can.style.left = "400px";
let intervalID = 0;
let isLeftArrow = false;
let isRightArrow = false;
let incrMike = 3;
let tobyY = 30;
let isSpaceKey = false;
let incrBall = 3;
let score = 0;
let audio = new Audio("/sounds/paper.wav");
let audio2 = new Audio("/sounds/twss.mp3");

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39 || event.keyCode == "ArrowRight") {
    isRightArrow = true;
    isLeftArrow = false;
  } else if (event.keyCode == 37 || event.keyCode == "ArrowLeft") {
    isRightArrow = false;
    isLeftArrow = true;
  }
  if (event.keyCode == 32 || event.keyCode == "Space") {
    isSpaceKey = true;
  }
});

document.addEventListener("keyup", (event) => {
  isRightArrow = false;
  isLeftArrow = false;
});

let backImg = document.createElement("img");
backImg.src = "images/bg.png";

let mike = document.createElement("img");
mike.src = "images/mike.png";

let toby = document.createElement("img");
toby.src = "images/toby.jpg";

let toby50 = document.createElement("img");
toby50.src = "images/toby50.png";

let ball = document.createElement("img");
ball.src = "images/ball2.png";

let ballY = canvas.height - mike.height - 38;
let mikeX = (canvas.width - mike.width) / 2;
let ballX = mikeX + 12;
let mikeY = canvas.height - mike.height;

function rndSize() {
  let rw = Math.floor(Math.random() * 80) + 20;
  let rh = rw * 1.4;
  return [rw, rh];
}

let firstSize = rndSize();

let arrToby = [{ x: 30, y: 30, width: firstSize[0], height: firstSize[1] }];

let balls = [];

function createBall() {
  if (isSpaceKey) {
    audio.play();
    balls.push({
      x: mikeX,
      y: mikeY,
    });
    isSpaceKey = false;
  }
}

function drawBall() {
  for (let i = 0; i < balls.length; i++) {
    ctx.drawImage(ball, balls[i].x, balls[i].y);
    balls[i].y -= incrBall;
    shoot = false;
    if (balls[i].y == 5) {
      balls.splice(i, 1);
    }
    // if (balls[i].y = -100) {
    // }
  }
}

function drawToby() {
  for (let i = 0; i < arrToby.length; i++) {
    ctx.drawImage(
      toby50,
      arrToby[i].x,
      arrToby[i].y,
      arrToby[i].width,
      arrToby[i].height
    );
    arrToby[i].y++;
    if (score > 25 && score < 50) {
      arrToby[i].y += 1.2;
    }
    if (score > 50 && score < 75) {
      arrToby[i].y += 1.5;
    }
    if (score > 75) {
      arrToby[i].y += 1.7;
    }
    if (arrToby[i].y == canvas.height + 2) {
      arrToby.shift();
      score--;
    }
    if (arrToby[i].y == toby.height / 2) {
      firstSize = rndSize();
      arrToby.push({
        x: Math.floor(Math.random() * (canvas.width - toby.width)),
        y: -toby.height,
        width: firstSize[0],
        height: firstSize[1],
      });
    }
  }
}

function collision() {
  for (let i = 0; i < arrToby.length; i++) {
    if (
      ((mikeX < arrToby[i].x + arrToby[i].width - 5 &&
        mikeX + mike.width + 5 > arrToby[i].x) ||
        (mikeX > arrToby[i].x - 5 &&
          mikeX < arrToby[i].x + arrToby[i].width - 5)) &&
      mikeY < arrToby[i].y + arrToby[i].height - 5
    ) {
      clearInterval(intervalID);
      gameOver();
    }

    for (let j = 0; j < balls.length; j++) {
      if (
        balls[j].x + 10 < arrToby[i].x + arrToby[i].width &&
        balls[j].x + ball.width > arrToby[i].x &&
        balls[j].y + 10 < arrToby[i].y + arrToby[i].height &&
        balls[j].y + arrToby[i].height > arrToby[i].y
      ) {
        balls.splice(j, 1);
        arrToby.splice(i, 1);
        score++;
        if (arrToby.length == 0) {
          firstSize = rndSize();
          arrToby.push({
            x: Math.floor(Math.random() * (canvas.width - toby.width)),
            y: -toby.height,
            width: firstSize[0],
            height: firstSize[1],
          });
        }
      }
    }
  }
}

function moveMike() {
  if (isRightArrow && mikeX + mike.width < canvas.width) {
    mikeX += incrMike;
  } else if (isLeftArrow && mikeX > 0) {
    mikeX -= incrMike;
  }
}

function draw() {
  ctx.drawImage(backImg, 0, 0);
  ctx.drawImage(mike, mikeX, backImg.height - mike.height);
  drawToby();
  moveMike();
  createBall();
  drawBall();
  collision();
  ctx.font = "25px American Typewriter Standard";
  ctx.fillStyle = "#330000";
  ctx.fillText("Points: " + score, canvas.width - 110, 25);
  if (score < 0) {
    clearInterval(intervalID);
    gameOver();
  }
}

let start = document.querySelector(".image");
let startBtn = document.querySelector("h2");
let restart = document.querySelector("h3");
let restartGame = document.querySelector(".done");

function startGame() {
  canvas.style.display = "block";
  start.style.display = "none";
  restartGame.style.display = "none";
  intervalID = setInterval(() => {
    requestAnimationFrame(draw);
  }, 4);
}
window.addEventListener("load", () => {
  start.style.display = "block";
  canvas.style.display = "none";
  restartGame.style.display = "none";

  startBtn.addEventListener("mouseover", () => {
    startBtn.style.cursor = "pointer";
    startBtn.style.color = "green";
  });
  startBtn.addEventListener("mouseout", () => {
    startBtn.style.color = "brown";
  });
  startBtn.addEventListener("click", () => {
    startGame();
  });
});

function gameOver() {
  audio2.play();
  restartGame.style.display = "block";
  canvas.style.display = "none";
  start.style.display = "none";
  restart.addEventListener("mouseover", () => {
    restart.style.cursor = "pointer";
    restart.style.color = "green";
  });
  restart.addEventListener("mouseout", () => {
    restart.style.color = "brown";
  });
  restart.addEventListener("click", () => {
    score = 0;
    firstSize = rndSize();
    arrToby = [{ x: 30, y: 30, width: firstSize[0], height: firstSize[1] }];
    balls = [];
    startGame();
  });
}
