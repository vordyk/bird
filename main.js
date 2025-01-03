let bird = new Image();
let back = new Image();
let road = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

let fly_audio = new Audio();
let score_audio = new Audio();

bird.src = "img/bird.png";
back.src = "img/back.png";
pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";
road.src = "img/road.png";

fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.height = 512;
canvas.width = 256;

let xPos = 10;
let yPos = 150;

let velY = 0;
let g = 0.2;

let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}
let gap = 100;

function draw() {
    context.drawImage(back, 0, 0);
    context.drawImage(bird, xPos, yPos);

    if (yPos >= canvas.height - road.height) {
        location.reload()
    }
    if (yPos <= 0) {
        location.reload()
    }

    velY = velY + g;
    yPos += velY;

    for (let i = 0; i < pipe.length; i++) {
        if (pipe[i].x < -pipeUp.width) {
            pipe.shift()
        } else {
            context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
            pipe[i].x -= 2;
        }
        if (pipe[i].x == 80) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
                    location.reload();
                }

        if (pipe[i].x == 0) {
            score_audio.play();
        }
    }

    context.drawImage(road, 0, canvas.height - road.height + 20);
}

setInterval(draw, 20);

addEventListener("mousedown", function () {
    velY = -5;
    fly_audio.play();
});