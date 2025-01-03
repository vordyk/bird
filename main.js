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

let score = 0;
let best_score = 0;

let score_text = document.getElementById("score");
let best_score_text = document.getElementById("best_score");

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

function reload() {
    xPos = 10;
    yPos = 150;
    velY = 0;
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: 0
    }
    if (score > best_score) {
        best_score = score;
    }
}

function draw() {
    context.drawImage(back, 0, 0);
    context.drawImage(bird, xPos, yPos);

    if (yPos >= canvas.height - road.height) {
        reload()
    }
    if (yPos <= 0) {
        reload()
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

        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            reload();
            score = 0;
        }

        if (pipe[i].x == 0) {
            score_audio.play();
            score++;
        }
    }

    context.drawImage(road, 0, canvas.height - road.height + 20);

    score_text.innerHTML = "Score: " + score;
    best_score_text.innerHTML = "Best Score: " + best_score;
}

setInterval(draw, 20);

document.addEventListener("keydown", function moveUp(event) {
    if (event.code == 'Space') {
        velY = -4;
        fly_audio.play();
    }
});

addEventListener("mousedown", function () {
    velY = -5;
    fly_audio.play();

});