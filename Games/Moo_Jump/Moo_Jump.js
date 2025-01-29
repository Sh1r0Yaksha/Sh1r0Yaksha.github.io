// Game state
const gameState = {
    isJumping: false,
    jumpHeight: 200, // pixels
    jumpDuration: 700, // ms
    obstacleMinInterval: 1000,  // ms
    obstacleMaxInterval: 2000,  // ms
    collisionoffset: 25, // px
    obstacles: [],  // queue for obstacles
    score: 0,
    isGameOver: false
};

const moo = document.getElementById('moo');
const scoreDisplay = document.getElementById('score');
const moo_img = document.getElementById('moo-img');

// Moving Objects
const background = document.querySelector('.game');
const ground = document.querySelector('.ground');

// Sound effects
const jumpSound = new Audio('/Games/Moo_Jump/Assets/Sounds/jump.mp3');
const collisionSound = new Audio('/Games/Moo_Jump/Assets/Sounds/game_over.mp3');
const scoreSound = new Audio('/Games/Moo_Jump/Assets/Sounds/score.mp3');

// Collision detection
function checkCollision(obstacle, offset) {
    const mooRect = moo.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        mooRect.right - (mooRect.width * (offset / 100)) < obstacleRect.left || 
        mooRect.left + (mooRect.width * (offset / 100)) > obstacleRect.right || 
        mooRect.bottom + (mooRect.height * (offset / 100)) < obstacleRect.top || 
        mooRect.top - (mooRect.height * (offset / 100)) > obstacleRect.bottom
    );
}

// Jump mechanics
function jump() {
    if (gameState.isJumping || gameState.isGameOver) return;
    
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
    // collisionSound.play();
    
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
    document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
    // Reset game on click or space
    const resetHandler = (event) => {
        if (event.type === 'click' || event.code === 'Space') {
            gameState.isGameOver = false;
            gameState.score = 0;
            scoreDisplay.innerHTML = 'Score: 0';
            gameOverDisplay.remove();
            
            window.removeEventListener('click', resetHandler);
            window.removeEventListener('keydown', resetHandler);
            background.style.animation = 'scroll-background 20s linear infinite';
            ground.style.animation = 'scroll-ground 0.01s linear infinite;';
            startObstacleGeneration();
        }
    };
    
    window.addEventListener('click', resetHandler);
    window.addEventListener('keydown', resetHandler);
}

// Obstacle generation
function createObstacle() {
    if (gameState.isGameOver) return;
    
    const obstacle = document.createElement('img');
    obstacle.className = 'obstacle';
    
    const height = Math.floor(Math.random() * 100) + 40;
    const width = Math.floor(Math.random() * 30) + 30;
    
    obstacle.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 1024px;
        width: ${width}px;
        height: ${height}px;
        content:url(/Games/Moo_Jump/Assets/Obstacles/pipe.png);
        transform: translateX(0);
        transition: transform 2s linear;
    `;
    
    document.querySelector('.main-area').appendChild(obstacle);
    
    let hasScored = false;
    
    // Collision and score checking
    const checkInterval = setInterval(() => {
        if (checkCollision(obstacle, gameState.collisionoffset)) {
            clearInterval(checkInterval);
            gameOver();
        } else if (!hasScored && obstacle.getBoundingClientRect().right < moo.getBoundingClientRect().left) {
            hasScored = true;
            gameState.score++;
            scoreDisplay.innerHTML = `Score: ${gameState.score}`;
            // scoreSound.currentTime = 0;
            // scoreSound.play();
        }
    }, 10);
    
    requestAnimationFrame(() => {
        obstacle.style.transform = 'translateX(-1064px)';
    });
    
    setTimeout(() => {
        obstacle.remove();
        clearInterval(checkInterval);
    }, gameState.obstacleMaxInterval);
}


// Start generating obstacles
function startObstacleGeneration() {
    function generateObstacle() {
        if (!gameState.isGameOver) {
            createObstacle();
            const nextInterval = Math.random() * 
                (gameState.obstacleMaxInterval - gameState.obstacleMinInterval) + 
                gameState.obstacleMinInterval;
            setTimeout(generateObstacle, nextInterval);
        }
    }
    generateObstacle();
}

// Start the game
startObstacleGeneration();
