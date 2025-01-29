// Game state
const gameState = {
    isJumping: false,
    jumpHeight: 200,
    jumpDuration: 700,
    obstacleMinInterval: 0.005,
    obstacleMaxInterval: 0.05,
    obstacleSpeed: 500,
    collisionOffset: 33,
    score: 0,
    isGameOver: false,
    isGameStarted: false,
    framerate: 60,
    obstacles: []
};

// DOM Elements
const moo = document.getElementById('moo');
const scoreDisplay = document.getElementById('score');
const moo_img = document.getElementById('moo-img');
const background = document.querySelector('.game');
const ground = document.getElementById('ground');

function showStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.className = 'start-screen';
    
    const startText = document.createElement('div');
    startText.className = 'start-text';
    startText.innerHTML = `
        Click or press Space to start
    `;
    
    startScreen.appendChild(startText);
    background.appendChild(startScreen);
    
    // Stop animations initially
    background.style.animation = 'none';
    ground.style.animation = 'none';
    moo_img.style.animation = 'none';

    const startHandler = (event) => {
        if (event.type === 'click' || event.code === 'Space') {
            event.preventDefault();
            gameState.isGameStarted = true;
            
            // Fade out and remove start screen
            startScreen.style.transition = 'opacity 0.5s';
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.remove();
            }, 500);
            
            // Start animations
            ground.style.animation = 'scroll-ground 2s linear infinite';
            background.style.animation = 'scroll-background 20s linear infinite';
            moo_img.style.animation = 'moo-walk 0.5s steps(10) infinite';
            
            window.removeEventListener('click', startHandler);
            window.removeEventListener('keydown', startHandler);
            
            startObstacleGeneration();
        }
    };
    
    window.addEventListener('click', startHandler);
    window.addEventListener('keydown', startHandler);
}

// Sound effects
const jumpSound = new Audio('Assets/Sounds/jump.mp3');
const collisionSound = new Audio('Assets/Sounds/game_over.mp3');
const scoreSound = new Audio('Assets/Sounds/score.mp3');

// Collision detection
function checkCollision(obstacle) {
    const mooRect = moo.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const offset = gameState.collisionOffset / 100;

    return !(
        mooRect.right - (mooRect.width * offset) < obstacleRect.left || 
        mooRect.left + (mooRect.width * offset) > obstacleRect.right || 
        mooRect.bottom - (mooRect.height * offset) < obstacleRect.top || 
        mooRect.top + (mooRect.height * offset) > obstacleRect.bottom
    );
}

// Jump mechanics
function jump() {
    if (!gameState.isGameStarted || gameState.isJumping || gameState.isGameOver) return;
    
    gameState.isJumping = true;
    jumpSound.currentTime = 0;
    jumpSound.play();
    moo_img.style.animation = `moo-jump ${gameState.jumpDuration * 2}ms steps(10) infinite`;
    
    moo.style.transition = `bottom ${gameState.jumpDuration/2}ms ease-out`;
    moo.style.bottom = `${gameState.jumpHeight}px`;
    
    setTimeout(() => {
        moo.style.transition = `bottom ${gameState.jumpDuration/2}ms ease-in`;
        moo.style.bottom = '0px';
        
        setTimeout(() => {
            gameState.isJumping = false;
            moo_img.style.animation = 'moo-walk 0.5s steps(10) infinite'; 
        }, gameState.jumpDuration/2);
    }, gameState.jumpDuration/2);
}

// Event listeners for jump
window.addEventListener('click', jump);
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    }
});

// Game over handling
function gameOver() {
    gameState.isGameOver = true;
    gameState.isGameStarted = false;
    collisionSound.play();
    
    const gameOverDisplay = document.createElement('div');
    gameOverDisplay.className = 'game-over';
    gameOverDisplay.innerHTML = `
        Game Over!<br>
        Final Score: ${gameState.score}<br>
        Click or press Space to restart
    `;
    background.appendChild(gameOverDisplay);
    background.style.animation = 'none';
    ground.style.animation = 'none';

    // Clear all obstacles
    gameState.obstacles.forEach(obs => obs.remove());
    gameState.obstacles = [];

    const resetHandler = (event) => {
        if (event.type === 'click' || event.code === 'Space') {
            gameState.isGameOver = false;
            gameState.isGameStarted = true;
            gameState.score = 0;
            scoreDisplay.textContent = 'Score: 0';
            gameOverDisplay.remove();
            
            window.removeEventListener('click', resetHandler);
            window.removeEventListener('keydown', resetHandler);
            ground.style.animation = 'scroll-ground 2s linear infinite';
            background.style.animation = 'scroll-background 20s linear infinite';
            moo_img.style.animation = 'moo-walk 0.5s steps(10) infinite';
            
            startObstacleGeneration();
        }
    };
    
    window.addEventListener('click', resetHandler);
    window.addEventListener('keydown', resetHandler);
}

// Obstacle management
function createObstacle() {
    if (gameState.isGameOver) return null;
    
    const obstacle = document.createElement('img');
    obstacle.className = 'obstacle';
    
    const height = Math.floor(Math.random() * 100) + 40;
    const width = Math.floor(Math.random() * 30) + 50;
    
    obstacle.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 1024px;
        width: ${width}px;
        height: ${height}px;
        content:url(Assets/Obstacles/pipe.png);
    `;
    
    document.querySelector('.main-area').appendChild(obstacle);
    gameState.obstacles.push(obstacle);
    return obstacle;
}

function moveObstacle(obstacle) {
    if (!obstacle) return false;
    const currentLeft = parseInt(obstacle.style.left) || 1024;
    const newLeft = currentLeft - gameState.obstacleSpeed * (1 / gameState.framerate);
    
    if (newLeft + obstacle.offsetWidth < 0) {
        return false; // Obstacle is off screen
    }
    
    obstacle.style.left = `${newLeft}px`;
    return true; // Obstacle still on screen
}

function updateScore() {
    gameState.score++;
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    scoreSound.play();
}

// Main game loop
async function obstacleLoop() {
    while (!gameState.isGameOver) {
        const obstacle = createObstacle();
        if (!obstacle) break;

        let isOnScreen = true;
        while (isOnScreen && !gameState.isGameOver) {
            isOnScreen = moveObstacle(obstacle);
            
            if (checkCollision(obstacle)) {
                gameOver();
                break;
            }
            
            if (!isOnScreen) {
                updateScore();
                const index = gameState.obstacles.indexOf(obstacle);
                if (index > -1) {
                    gameState.obstacles.splice(index, 1);
                }
                obstacle.remove();
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000 / gameState.framerate));
        }

        // Wait for next obstacle
        const nextInterval = Math.random() * (gameState.obstacleMaxInterval - gameState.obstacleMinInterval) + gameState.obstacleMinInterval;
        await new Promise(resolve => setTimeout(resolve, nextInterval * 1000));
    }
}

// Modified start game function
function startObstacleGeneration() {
    gameState.obstacles = [];
    obstacleLoop();
}

// Initialize game with start screen
showStartScreen();