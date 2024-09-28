const ball = document.getElementById('ball');
const hoop = document.getElementById('hoop');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const restartBtn = document.getElementById('restartBtn');
const swooshSound = document.getElementById('swooshSound');

let score = 0;
let level = 1;
let hoopSpeed = 2000;  // Initial speed for moving the hoop
let isGameOver = false;
let hoopDirection = 1; // 1 for right, -1 for left

// Move the hoop from left to right continuously
function animateHoop() {
  const containerWidth = document.querySelector('.game-container').clientWidth;
  const hoopWidth = hoop.clientWidth;
  let position = 0;

  function frame() {
    if (isGameOver) return;

    position += hoopDirection * (level + 1); // Increase speed with level
    if (position > containerWidth - hoopWidth || position < 0) {
      hoopDirection *= -1; // Change direction when hitting boundaries
    }
    hoop.style.left = `${position}px`;
    requestAnimationFrame(frame);
  }
  frame();
}

// Increase difficulty level
function increaseDifficulty() {
  level++;
  levelDisplay.textContent = level;
}

// Restart the game
restartBtn.addEventListener('click', () => {
  score = 0;
  level = 1;
  isGameOver = false;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  restartBtn.classList.add('hidden');
  ball.style.bottom = '20px';
  animateHoop();
});

// Check if the ball enters the hoop
function checkIfScored() {
  const ballRect = ball.getBoundingClientRect();
  const ringRect = document.querySelector('.ring').getBoundingClientRect();

  const ballCenterX = ballRect.left + ballRect.width / 2;

  if (ballCenterX > ringRect.left && ballCenterX < ringRect.right) {
    score++;
    scoreDisplay.textContent = score;
    swooshSound.play(); // Play swoosh sound
    if (score % 5 === 0) increaseDifficulty(); // Every 5 points, increase difficulty
  } else {
    isGameOver = true;
    alert('Game Over! You missed.');
    restartBtn.classList.remove('hidden');
  }
}

// Move the ball when clicked and make it bounce
ball.addEventListener('click', () => {
  if (isGameOver) return;

  // Move the ball upwards and then bounce back
  ball.style.bottom = '300px';

  setTimeout(() => {
    ball.style.bottom = '20px'; // Bounce back to the floor
    checkIfScored();
  }, 500); // Adjusted to match the animation duration
});

// Start the hoop animation
animateHoop();
