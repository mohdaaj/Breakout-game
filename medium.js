const gameBoundary = document.getElementById("game-boundary");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const resetBtn = document.getElementById("reset");

const bricks = document.querySelectorAll(".brick, .brickG, .brickB, .brickP, brickGold");


const loseImg = document.querySelector('#Cat Laughing At You')
const loseSays = new Audio('../assets/sounds/Cat Laughing At You.mp3')

const popSays = new Audio('../assets/sounds/Pop sound effect.mp3')

const img = document.createElement("img");  

//////////////////////////////////////////variables////////////////////////////////////////////////

let x = 0;
let y = 0;

let dx =8 , dy = -8;

let intervalId;

let gameRunning = false;
let gamereset = true; 

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
  if (event.code === "Space" ) {
    if (!gameRunning && gamereset) {
    positionBallAbovePaddle();
    intervalId = setInterval(moveBall, 10);
    gameRunning = true;
    gamereset = false;
    gameBoundary.style.color = "#1e1e2f";

  }
  }
});


resetBtn.addEventListener("click", () => {
  location.reload(); 
  gamereset = true; 
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





function moveBall() {
  x += dx;
  y += dy;
  ball.style.left = x + "px";
  ball.style.top = y + "px";

  // Bounce off walls
  if (x <= 0 || x + ball.offsetWidth >= gameBoundary.clientWidth) {
    dx = -dx;
  }

  if (y <= 0) {
    dy = -dy;
  }

  // Select all bricks, including colored ones
  const currentBricks = document.querySelectorAll(".brick, .brickG, .brickB, .brickP, .brickGold");

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
      // Determine bounce direction
      const overlapLeft = (x + ball.offsetWidth) - brickLeft;
      const overlapRight = brickRight - x;
      const overlapTop = (y + ball.offsetHeight) - brickTop;
      const overlapBottom = brickBottom - y;

      const minOverlapX = Math.min(overlapLeft, overlapRight);
      const minOverlapY = Math.min(overlapTop, overlapBottom);

      if (minOverlapX < minOverlapY) {
        dx = -dx; // Horizontal bounce
      } else {
        dy = -dy; // Vertical bounce
      }

      // Scoring based on brick type
      let points = 100; // Default
      if (brick.classList.contains("brickG")) points = 150;
      else if (brick.classList.contains("brickB")) points = 200;
      else if (brick.classList.contains("brickP")) points = 250;
      else if (brick.classList.contains("brickGold")) points = 400;

      brick.remove();
      popSays.volume = 0.05;
      popSays.play();

      // Update score
      const scoreboard = document.querySelector(".scoreboard");
      const currentScore = parseInt(scoreboard.textContent);
      scoreboard.textContent = currentScore + points;

      // Check win condition
      const remainingBricks = document.querySelectorAll(".brick, .brickG, .brickB, .brickP, brickGold");
      if (remainingBricks.length === 0) {
        endGame();
        showWinMessage();
      }

      break;
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
    showLoseMessage();
  }
}







function endGame() {
  clearInterval(intervalId);
  gameRunning = false;
}



function showWinMessage() {
  const winMessage = document.createElement("div");
  winMessage.innerText = "🎉You Win!🎉";
  winMessage.style.position = "absolute";
  winMessage.style.top = "50%";
  winMessage.style.left = "50%";
  winMessage.style.transform = "translate(-50%, -50%)";
  winMessage.style.fontSize = "36px";
  winMessage.style.fontWeight = "bold";
  winMessage.style.color = "#24eb88";
  winMessage.style.textShadow = "2px 2px #000";
  winMessage.style.zIndex = "1000";
  winMessage.id = "win-message";
  gameBoundary.appendChild(winMessage);
}

function showLoseMessage() {
  const loseMessage = document.createElement("div");
  loseMessage.innerText = " You lose! ";
  loseMessage.style.position = "absolute";
  loseMessage.style.top = "50%";
  loseMessage.style.left = "50%";
  loseMessage.style.transform = "translate(-50%, -50%)";
  loseMessage.style.fontSize = "36px";
  loseMessage.style.fontWeight = "bold";
  loseMessage.style.color = "#24eb88";
  loseMessage.style.textShadow = "2px 2px #000";
  loseMessage.style.zIndex = "1000";
  loseMessage.style.textAlign = "center"; // center the text
  loseMessage.id = "lose-message";

  
  const img = document.createElement("img");
  img.src = "https://cdn3.emoji.gg/emojis/8413-cat-point-and-laugh.png";
  img.style.width = "300px";
  img.style.borderRadius = "12px";
  img.style.marginTop = "20px";
  
  loseSays.volume = .05
  loseSays.play()
  
  gameBoundary.appendChild(loseMessage);
  loseMessage.appendChild(img);
}



/////////////////////////////////////////difficulty/////////////////////////////////////////////////




