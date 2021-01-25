let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";
let can = document.querySelector("canvas");
can.style.position = "absolute";
can.style.top = "30px";
can.style.left = "400px";
let intervalID = 0;
let intervalID2 = 0;
let isLeftArrow = false;
let isRightArrow = false;
let incrMike = 5;
let tobyY = 30;

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39 || event.keyCode == "ArrowRight") {
    isRightArrow = true;
    isLeftArrow = false;
  } else if (event.keyCode == 37 || event.keyCode == "ArrowLeft") {
    isRightArrow = false;
    isLeftArrow = true;
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

let arrToby = [{ x: 30, y: 30 }];

function randSize() {
    let rnd = Math.floor(Math.random() * 20)
    return rnd
}

function randHeight() {
    let height = Math.floor(Math.random() * 60)
    return height
}



let mikeX = (backImg.width - mike.width) / 2;
function draw() {
  ctx.drawImage(backImg, 0, 0);
  ctx.drawImage(mike, mikeX, backImg.height - mike.height);
  for (let i = 0; i < arrToby.length; i++) {
    ctx.drawImage(toby, arrToby[i].x, arrToby[i].y, randSize(), randHeight());
    arrToby[i].y++;
    if (arrToby[i].y == toby.height / 2) {
      arrToby.push({
        x: Math.floor(Math.random() * (canvas.width - toby.width)),
        y: -toby.height,
      });
    }
  }
  if (isRightArrow && mikeX + mike.width < canvas.width) {
    mikeX += incrMike;
  } else if (isLeftArrow && mikeX > 0) {
    mikeX -= incrMike;
  }
}

intervalID = setInterval(() => {
  requestAnimationFrame(draw);
}, 10);
