
var gameOver = false;

const blockSize = 10;
const rows = 20;
const cols = 30;

var board;
var context;

var snakeX = 5 * blockSize;
var snakeY = 5 * blockSize;
var snakeBody = [];
var dirX = 0;
var dirY = 0;

var foodX;
var foodY;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 5);
}

function changeDirection(e) {
    switch (e.code) {
        case "ArrowUp":
            if (dirY != 1) {
                dirX = 0;
                dirY = -1;
            }
            break;
        case "ArrowDown":
            if (dirY != -1) {
                dirX = 0;
                dirY = 1;
            }
            break;
        case "ArrowLeft":
            if (dirX != 1) {
                dirX = -1;
                dirY = 0;
            }
            break;
        case "ArrowRight":
            if (dirX != -1) {
                dirX = 1;
                dirY = 0;
            }
            break;

        default:
            break;
    }
}

function update() {
    if (gameOver) {
        return;
    }


    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    context.fillStyle = "lime";
    snakeX += dirX * blockSize;
    snakeY += dirY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        alert(`Your Score is ${snakeBody.length}`);
        gameOver = true
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert(`Your Score is ${snakeBody.length}`);
            gameOver = true;
        }
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
