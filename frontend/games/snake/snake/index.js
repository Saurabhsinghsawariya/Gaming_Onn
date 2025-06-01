// Canvas setup
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Game constants
const GRID_SIZE = 20;
const SNAKE_SPEED = 150; // Lower number = faster speed
const INITIAL_SNAKE_LENGTH = 4;

// Calculate grid dimensions
const GRID_WIDTH = Math.floor(canvas.width / GRID_SIZE);
const GRID_HEIGHT = Math.floor(canvas.height / GRID_SIZE);

// Game state
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let gameLoop = null;
let gameStarted = false;

// Theme configurations
const THEMES = [
    {
        name: 'default',
        snake: {
            head: '#EC4899',
            body: '#7C3AED',
            glow: 'rgba(236, 72, 153, 0.5)'
        },
        food: '#10B981',
        background: '#030712'
    },
    {
        name: 'cyber',
        snake: {
            head: '#00ff00',
            body: '#00cc00',
            glow: 'rgba(0, 255, 0, 0.5)'
        },
        food: '#ff00ff',
        background: '#000000'
    },
    {
        name: 'sunset',
        snake: {
            head: '#ff6b6b',
            body: '#ffd93d',
            glow: 'rgba(255, 107, 107, 0.5)'
        },
        food: '#4ecdc4',
        background: '#2c2c54'
    },
    {
        name: 'ocean',
        snake: {
            head: '#00b8d4',
            body: '#0052cc',
            glow: 'rgba(0, 184, 212, 0.5)'
        },
        food: '#ff4081',
        background: '#002233'
    }
];

let currentThemeIndex = 0;

// Colors
const COLORS = THEMES[currentThemeIndex];

// Load sound effects with local audio files
const eatSound = new Audio("./assets/eat.wav");
const gameOverSound = new Audio("./assets/gameover.wav");

// Initialize game
function initGame() {
    // Create initial snake
    snake = [];
    const startX = Math.floor(GRID_WIDTH / 4);
    const startY = Math.floor(GRID_HEIGHT / 2);
    
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        snake.push({ x: startX - i, y: startY });
    }
    
    // Place initial food
    placeFood();
    
    // Reset score
    score = 0;
    updateScore();
    
    // Reset theme
    currentThemeIndex = 0;
    COLORS.snake = THEMES[0].snake;
    COLORS.food = THEMES[0].food;
    COLORS.background = THEMES[0].background;
}

// Place food at random position
function placeFood() {
    food = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
    };
    // Ensure food doesn't appear on snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Change theme based on score
function updateTheme() {
    const themeIndex = Math.floor(score / 100) % THEMES.length;
    if (themeIndex !== currentThemeIndex) {
        currentThemeIndex = themeIndex;
        COLORS.snake = THEMES[currentThemeIndex].snake;
        COLORS.food = THEMES[currentThemeIndex].food;
        COLORS.background = THEMES[currentThemeIndex].background;
        
        // Add visual feedback for theme change
        canvas.style.transition = 'filter 0.5s';
        canvas.style.filter = 'brightness(1.5)';
        setTimeout(() => {
            canvas.style.filter = 'brightness(1)';
        }, 500);
    }
}

// Game loop
function update() {
    const head = { ...snake[0] };
    
    // Update position based on direction
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // Check for collisions
    if (head.x < 0 || head.x >= GRID_WIDTH ||
        head.y < 0 || head.y >= GRID_HEIGHT ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        updateTheme(); // Add theme update check
        placeFood();
        eatSound.play();
    } else {
        snake.pop();
    }
    
    // Update direction for next frame
    direction = nextDirection;
    
    // Update theme based on score
    updateTheme();
    
    // Draw game
    draw();
}

// Draw game state
function draw() {
    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? COLORS.snake.head : COLORS.snake.body;
        ctx.shadowColor = COLORS.snake.glow;
        ctx.shadowBlur = index === 0 ? 20 : 10;
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 1,
            GRID_SIZE - 1
        );
    });
    
    // Draw food
    ctx.fillStyle = COLORS.food;
    ctx.shadowColor = COLORS.food;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE/2,
        food.y * GRID_SIZE + GRID_SIZE/2,
        GRID_SIZE/2 - 1,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
}

// Handle keyboard input
function handleKeydown(e) {
    if (!gameStarted) {
        startGame();
        return;
    }
    
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
}

// Game over handling
function gameOver() {
    clearInterval(gameLoop);
    gameStarted = false;
    gameOverSound.play(); // Play game over sound
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverModal').style.display = 'block';
}

// Event listeners
document.addEventListener('keydown', handleKeydown);
window.addEventListener('load', initGame);

// Restart game
function restartGame() {
    gameStarted = true;
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
    initGame();
    startGame();
}

// Start game
function startGame() {
    const startContainer = document.getElementById('startContainer');
    startContainer.classList.add('hidden');
    gameStarted = true;
    direction = 'right';
    nextDirection = 'right';
    gameLoop = setInterval(update, SNAKE_SPEED);
}