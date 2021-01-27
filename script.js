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

// document.addEventListener("click", (event) => {
   
// })

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
let mikeX = (backImg.width - mike.width) / 2;
let ballX = mikeX + 12;
let mikeY = backImg.height - mike.height;

function rndSize() {
  let rw = Math.floor(Math.random() * 80) + 20;
  let rh = rw * 1.4
  return [rw, rh]
}

let firstSize = rndSize();

function ballPos() {
  let x = mike + 12
  let y = ballY
  return [x,y]
}

let firstPos = ballPos()

let arrToby = [{ x: 30, y: 30, width: firstSize[0], height: firstSize[1] }];

let balls = [{x:firstPos[0], y: firstPos[1]}]




function drawBall() {
  if (isSpaceKey) {
    for (let i = 0; i < balls.length; i++) {
      ctx.drawImage(ball, balls[i].x, balls[i].y);
      mikeY -= incrBall;
      balls.push({ x: firstPos[0], y: -mikeY});
    }
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
    if (arrToby[i].y == canvas.height+2) {
      arrToby.shift();
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
  for (let i = 0; i < arrToby.length; i++){
    if (
    ((mikeX < arrToby[i].x + arrToby[i].width-5 &&
    mikeX + mike.width+5 > arrToby[i].x)|| (mikeX > arrToby[i].x-5 && mikeX < arrToby[i].x + arrToby[i].width-5)) &&
    mikeY < arrToby[i].y + arrToby[i].height-5
  ) {
    clearInterval(intervalID);
    alert("GAME OVER");
    location.reload();
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
      drawBall();
      moveMike();
      collision();
  
  
  }

intervalID = setInterval(() => {
  requestAnimationFrame(draw);
}, 5)













  // for (let i = 0; i < arrBall.length; i++) {
    //   ctx.drawImage(ball, mikeX + 12, ballY)
    //   ballY -= incrBall
    //   if (ballY == 0) {
    //     arrBall.push({
    //       x: mikeX + 12,
    //       y: ballY
    //     });
    //   }

    // }
    
    // if (isSpaceKey) {
    //   ctx.drawImage(ball, mikeX + 12, ballY);
    //   ballY -= incrBall
    
    // }
