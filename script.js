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
    console.log(key);
  } else if (event.keyCode == 37 || event.keyCode == "ArrowLeft") {
    isRightArrow = false;
    isLeftArrow = true;
    console.log(key);
  }
  if (event.keyCode == 32 || event.keyCode == "Space") {
    isSpaceKey = true;
    console.log(key);
  }
});

// document.addEventListener("click", (event) => {
   
// })

document.addEventListener("keyup", (event) => {
  isRightArrow = false;
  isLeftArrow = false;
  isSpaceKey = false;
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

function rndWidth() {
  let rw = Math.floor(Math.random() * 80) + 20;
  return rw;
}

// function rndHeight() {
//   let rh = Math.floor(Math.random() * 100) + 20;
//   return rh
// }

let arrToby = [{ x: 30, y: 30, width: rndWidth(), height: rndWidth() }];

let ballY = canvas.height - mike.height - 38;
let mikeX = (backImg.width - mike.width) / 2;

let arrBall = [{ x: mikeX + 12, y: ballY }];



function draw() {
  ctx.drawImage(backImg, 0, 0);
  ctx.drawImage(mike, mikeX, backImg.height - mike.height);
  for (let i = 0; i < arrToby.length; i++) {
    ctx.drawImage(
      toby50,
      arrToby[i].x,
      arrToby[i].y,
      arrToby[i].width,
      arrToby[i].width
    );
    arrToby[i].y++;
    if (arrToby[i].y == toby.height / 2) {
      arrToby.push({
        x: Math.floor(Math.random() * (canvas.width - toby.width)),
        y: -toby.height,
        width: rndWidth(),
        height: rndWidth(),
      });
    }
  }
  if (isRightArrow && mikeX + mike.width < canvas.width) {
    mikeX += incrMike;
  } else if (isLeftArrow && mikeX > 0) {
    mikeX -= incrMike;
  }
  if (isSpaceKey) {
    ctx.drawImage(ball, mikeX + 12, ballY);
    ballY -= incrBall;
  }
  
}
  
intervalID = setInterval(() => {
  requestAnimationFrame(draw);
}, 5);




