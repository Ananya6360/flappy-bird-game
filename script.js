const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
function drawDeveloperText() {

    ctx.fillStyle = "#FFD700";
    ctx.font = "12px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "Developed by Ananya ❤️",
        canvas.width / 2,
        canvas.height - 15
    );

    ctx.textAlign = "left";
}

const startButton = document.getElementById("startButton");

// ===============================
// GAME VARIABLES
// ===============================

let birdX = 180;
let birdY = 250;
let gravity = 2;

let pipeX = 250;
let pipeWidth = 60;
let topPipeHeight = 200;
let gap = 170;

let score = 0;
let highScore = Number(localStorage.getItem("flappyHighScore")) || 0;

let coins = 0;

let coinX = 450;
let coinY = 300;
let coinSize = 12;

let gameStarted = false;
let gameOver = false;
let newHighScore = false;
let coinSound = new Audio("koiroylers-get-coin-351945.mp3");


// ===============================
// IMAGES
// ===============================

let birdImage = new Image();
birdImage.src = "bird.png";

let backgroundImage = new Image();
backgroundImage.src = "background.png";


// ===============================
// SOUNDS
// ===============================

let jumpSound = new Audio("sfx_wing.mp3");
let hitSound = new Audio("hit.mp3");


// ===============================
// JUMP
// ===============================

function jump() {

    if (!gameStarted || gameOver) {
        return;
    }

    birdY -= 30;

    jumpSound.currentTime = 0;
    jumpSound.play();
}


// ===============================
// KEYBOARD
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {
        jump();
    }

});


// ===============================
// PHONE / MOUSE
// ===============================

canvas.addEventListener("click", function() {
    jump();
});


// ===============================
// START BUTTON
// ===============================

startButton.addEventListener("click", function() {
    startGame();
});


// ===============================
// START GAME
// ===============================

function startGame() {

    birdY = 250;

    pipeX = 250;
    topPipeHeight = 200;

    score = 0;
    coins = 0;

    coinX = 450;

    gameOver = false;
    gameStarted = true;
    newHighScore = false;

    startButton.style.display = "none";
    startButton.style.top = "50%";

    gameLoop();
}


// ===============================
// DRAW BIRD
// ===============================

function drawBird() {

    ctx.drawImage(
        birdImage,
        birdX,
        birdY,
        40,
        40
    );
}


// ===============================
// DRAW PIPES
// ===============================

function drawPipes() {

    ctx.fillStyle = "green";

    ctx.fillRect(
        pipeX,
        0,
        pipeWidth,
        topPipeHeight
    );

    ctx.fillRect(
        pipeX,
        topPipeHeight + gap,
        pipeWidth,
        canvas.height - (topPipeHeight + gap)
    );
}


// ===============================
// DRAW COIN
// ===============================

function drawCoin() {

    ctx.fillStyle = "gold";

    ctx.beginPath();

    ctx.arc(
        coinX,
        coinY,
        coinSize,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle = "#ff9800";
    ctx.lineWidth = 3;

    ctx.stroke();
}


// ===============================
// DRAW SCORE
// ===============================

function drawScore() {

    ctx.fillStyle = "white";
    ctx.font = "15px Arial";

    ctx.fillText(
        "Score: " + score,
        15,
        35
    );

    ctx.fillText(
        "🪙 " + coins,
        15,
        65
    );

    ctx.fillText(
        "High: " + highScore,
        15,
        95
    );
}
drawDeveloperText();
// ===============================
// COIN COLLISION
// ===============================

function checkCoinCollision() {

    let birdCenterX = birdX + 20;
    let birdCenterY = birdY + 20;

    let distanceX = birdCenterX - coinX;
    let distanceY = birdCenterY - coinY;

    let distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
    );
if (distance < 20 + coinSize) {

    coins += 5;

    coinSound.currentTime = 0;
    coinSound.play();

    coinX = -100;
}
   }


// ===============================
// GAME OVER
// ===============================

function gameOverNow() {

    if (!gameOver) {

        gameOver = true;

        hitSound.currentTime = 0;
        hitSound.play();

        if (score > highScore) {

            highScore = score;

            localStorage.setItem(
                "flappyHighScore",
                highScore
            );

            newHighScore = true;
        }

        startButton.innerText = "▶ PLAY AGAIN";

        startButton.style.display = "block";

        // Put button below the message
        startButton.style.top = "88%";
    }
}


// ===============================
// GAME OVER SCREEN
// ===============================

function drawGameOver() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";


    // ===========================
    // NEW HIGH SCORE
    // ===========================

    if (newHighScore) {

        ctx.fillStyle = "#FFD700";

        ctx.font = "27px Arial";

        ctx.fillText(
            "🎉 NEW HIGH SCORE! 🎉",
            canvas.width / 2,
            190
        );

        ctx.fillStyle = "white";

        ctx.font = "21px Arial";

        ctx.fillText(
            "Congratulations!",
            canvas.width / 2,
            230
        );

        ctx.fillText(
            "You beat the high score!",
            canvas.width / 2,
            265
        );

    }


    // ===========================
    // NORMAL GAME OVER
    // ===========================

    else {

        ctx.fillStyle = "red";

        ctx.font = "40px Arial";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            220
        );
    }


    // ===========================
    // SCORE
    // ===========================

    ctx.fillStyle = "white";

    ctx.font = "22px Arial";

    ctx.fillText(
        "Score: " + score,
        canvas.width / 2,
        315
    );


    // ===========================
    // COINS
    // ===========================

    ctx.fillText(
        "🪙 Coins: " + coins,
        canvas.width / 2,
        350
    );


    // ===========================
    // HIGH SCORE
    // ===========================

    ctx.fillText(
        "High Score: " + highScore,
        canvas.width / 2,
        385
    );

    ctx.textAlign = "left";
}


// ===============================
// MAIN GAME LOOP
// ===============================

function gameLoop() {

    if (!gameStarted) {
        return;
    }


    if (gameOver) {

        drawGameOver();

        return;
    }


    // ===========================
    // BACKGROUND
    // ===========================

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.drawImage(
        backgroundImage,
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ===========================
    // BIRD MOVEMENT
    // ===========================

    birdY += gravity;


    // ===========================
    // PIPE MOVEMENT
    // ===========================

    pipeX -= 2;


    // ===========================
    // COIN MOVEMENT
    // ===========================

    coinX -= 2;


    // ===========================
    // PIPE COLLISION
    // ===========================

    if (
        birdX + 40 > pipeX &&
        birdX < pipeX + pipeWidth
    ) {

        if (
            birdY < topPipeHeight ||
            birdY + 40 > topPipeHeight + gap
        ) {

            gameOverNow();
        }
    }


    // ===========================
    // TOP / GROUND COLLISION
    // ===========================

    if (
        birdY <= 0 ||
        birdY + 40 >= canvas.height
    ) {

        gameOverNow();
    }


    // ===========================
    // COIN COLLISION
    // ===========================

    checkCoinCollision();


    // ===========================
    // NEW PIPE
    // ===========================

    if (pipeX < -pipeWidth) {

        pipeX = canvas.width;

        topPipeHeight =
            Math.floor(Math.random() * 250) + 50;

        score++;


        // New coin

        coinX = canvas.width + 100;

        coinY =
            Math.floor(Math.random() * 400) + 100;
    }


    // ===========================
    // DRAW
    // ===========================

    drawPipes();

    drawCoin();

    drawScore();

    drawBird();

    drawDeveloperText();

    requestAnimationFrame(gameLoop);
}