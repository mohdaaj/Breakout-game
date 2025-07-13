const gameBoundary = document.getElementById("game-boundary");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const resetBtn = document.getElementById("reset");
const startBtn = document.getElementById("start");
const bricks = document.querySelectorAll(".brick");

//////////////////////////////////////////variables////////////////////////////////////////////////

let x = 0;
let y = 0;

let dx = 2, dy = -2;

let intervalId;

let gameRunning = false;

const ballWidth = ball.offsetWidth;
const ballHeight = ball.offsetHeight;
const boundaryWidth = gameBoundary.clientWidth;
const boundaryHeight = gameBoundary.clientHeight;


const paddleTop = paddle.offsetTop;
const paddleLeft = paddle.offsetLeft;
const paddleRight = paddleLeft + paddle.offsetWidth;


//////////////////////////////////////////Listeners////////////////////////////////////////////////


gameBoundary.addEventListener("mousemove", function(event) {
  //  taking the mouse position inside the boundary
  const boundaryRect = gameBoundary.getBoundingClientRect();
  const mouseX = event.clientX - boundaryRect.left;

  //  centering the paddle for mouse
  const paddleWidth = paddle.offsetWidth;
  let newLeft = mouseX - paddleWidth / 2;

  // making the paddle inside the boundary and not letting it getting out of it.
  const maxLeft = gameBoundary.clientWidth - paddleWidth;
  if (newLeft < 0) newLeft = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;

  //  Applying the new position
  paddle.style.left = newLeft + "px";
});


document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    if (!gameRunning) {
    positionBallAbovePaddle();
    intervalId = setInterval(moveBall, 10);
    gameRunning = true;
  }
  }
});

resetBtn.addEventListener("click", () => {
  location.reload();  
});


startBtn.addEventListener("click", function () {
    if (!gameRunning) {
    positionBallAbovePaddle();
    intervalId = setInterval(moveBall, 10);
    gameRunning = true;
  }
});

///////////////////////////////////////////functions///////////////////////////////////////////////

function positionBallAbovePaddle() {
  const paddleLeft = paddle.offsetLeft;
  const paddleTop = paddle.offsetTop;
  const paddleWidth = paddle.offsetWidth;

  const ballWidth = ball.offsetWidth;
  const ballHeight = ball.offsetHeight;

  // Center ball horizontally on paddle
  x = paddleLeft + (paddleWidth / 2) - (ballWidth / 2);

  // Place ball a few pixels above the paddle
  y = paddleTop - ballHeight - 5;

  // Apply visually
  ball.style.left = x + "px";
  ball.style.top = y + "px";
}




//
brick.classList.add("ghost-brick");
//




function moveBall() {
  x += dx;
  y += dy;
  ball.style.left = x + "px";
  ball.style.top = y + "px";

  // Bounce off left and right walls
  if (x <= 0 || x + ball.offsetWidth >= gameBoundary.clientWidth) {
    dx = -dx;
  }

  // Bounce off top wall
  if (y <= 0) {
    dy = -dy;
  }

  // Get the current bricks in DOM at this frame
  const currentBricks = document.querySelectorAll(".brick");

  for (let i = 0; i < currentBricks.length; i++) {
    const brick = currentBricks[i];

    const brickTop = brick.offsetTop;
    const brickLeft = brick.offsetLeft;
    const brickRight = brickLeft + brick.offsetWidth;
    const brickBottom = brickTop + brick.offsetHeight;

    if (
      x + ball.offsetWidth >= brickLeft &&
      x <= brickRight &&
      y + ball.offsetHeight >= brickTop &&
      y <= brickBottom
    ) {
      dy = -dy;          // Bounce
      brick.style.backgroundColor = "#1e1e2f";
      brick.style.border =  "#1e1e2f";  // Remove the brick hit
      break;             // Stop checking more bricks this frame
    }
  }

  // Paddle bounce
  if (
    y + ball.offsetHeight >= paddle.offsetTop &&
    x + ball.offsetWidth >= paddle.offsetLeft &&
    x <= paddle.offsetLeft + paddle.offsetWidth
  ) {
    dy = -dy;
  }

  // Game over
  else if (y + ball.offsetHeight >= gameBoundary.clientHeight) {
    endGame();
  }
}




function endGame() {
  clearInterval(intervalId);
  
  gameRunning = false;
}





//////////////////////////////////////////////////////////////////////////////////////////





