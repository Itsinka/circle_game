const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let score = 0;
let isGameStarted = false;
let countdown = 30;
let timerIntervalId;
const highScores = [];

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#4CAF50';
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, 40);
}

function drawCountdown() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Time: ${countdown}`, canvas.width - 120, 40);
}

function drawGameOver() {
  ctx.fillStyle = '#000';
  ctx.font = '48px Arial';
  ctx.fillText(`Game Over!`, canvas.width / 2 - 140, canvas.height / 2);
}

function drawHighScores() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`High Scores:`, 20, canvas.height - 20);
  for (let i = 0; i < highScores.length; i++) {
    ctx.fillText(`${i + 1}. ${highScores[i]}`, 20, canvas.height - 60 - i * 30);
  }
}

function startTimer() {
  timerIntervalId = setInterval(function() {
    countdown--;
    clearCanvas();
    drawScore();
    drawCountdown();
    if (countdown <= 0) {
      clearInterval(timerIntervalId);
      isGameStarted = false;
      drawGameOver();
      if (highScores.length < 10) {
        highScores.push(score);
      } else if (score > highScores[9]) {
        highScores[9] = score;
      }
      highScores.sort(function(a, b) { return b - a; });
      drawHighScores();
    }
  }, 1000);
}

function startGame() {
  isGameStarted = true;
  score = 0;
  countdown = 30;
  clearCanvas();
  drawScore();
  drawCountdown();
  startTimer();
  drawCircle(Math.random() * canvas.width, Math.random() * canvas.height, 50);
}

canvas.addEventListener('click', function(e) {
  if (!isGameStarted) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const distance = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2));
  if (distance <= 50) {
    score++;
    clearCanvas();
    drawScore();
    drawCircle(Math.random() * canvas.width, Math.random() * canvas.height, 50);
  }
});

document.getElementById('start-button').addEventListener('click', function() {
  startGame();
});
