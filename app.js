const gameBoundary = document.getElementById("game-boundary");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");


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


function moveBall() {
    
}