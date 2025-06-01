const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

// Set canvas dimensions
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Load images
const spaceshipImg = new Image();
spaceshipImg.src = "images/spaceshipp_ormbg.png";

const asteroidImg = new Image();
asteroidImg.src = "images/astroid.png";

// Game variables
let spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 15,
};

let bullets = [];
let asteroids = [];
let score = 0;
let isGameOver = false;
let animationId;
let asteroidInterval;

// Event listeners for spaceship movement and shooting
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && spaceship.x > 0) {
        spaceship.x -= spaceship.speed;
    } else if (e.key === "ArrowRight" && spaceship.x + spaceship.width < canvas.width) {
        spaceship.x += spaceship.speed;
    } else if (e.key === " ") {
        bullets.push({
            x: spaceship.x + spaceship.width / 2 - 5,
            y: spaceship.y,
            width: 5,
            height: 10,
            speed: 7,
        });
    }
});

// Generate asteroids
function generateAsteroids() {
    asteroidInterval = setInterval(() => {
        const x = Math.random() * (canvas.width - 50);
        asteroids.push({
            x: x,
            y: -50,
            width: 50,
            height: 50,
            speed: 3 + Math.random() * 2,
        });
    }, 1000);
}

// Draw spaceship
function drawSpaceship() {
    ctx.drawImage(spaceshipImg, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Draw bullets
function drawBullets() {
    bullets.forEach((bullet, index) => {
        ctx.fillStyle = "red";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed;

        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

// Draw asteroids
function drawAsteroids() {
    asteroids.forEach((asteroid, index) => {
        ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroid.width, asteroid.height);
        asteroid.y += asteroid.speed;

        if (asteroid.y > canvas.height) {
            asteroids.splice(index, 1);
        }

        if (
            asteroid.x < spaceship.x + spaceship.width &&
            asteroid.x + asteroid.width > spaceship.x &&
            asteroid.y < spaceship.y + spaceship.height &&
            asteroid.y + asteroid.height > spaceship.y
        ) {
            isGameOver = true;
            clearInterval(asteroidInterval);
            cancelAnimationFrame(animationId);
            restartBtn.style.display = "block";
            alert("Game Over! Your score: " + score);
        }
    });
}

// Check for collisions between bullets and asteroids
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        asteroids.forEach((asteroid, asteroidIndex) => {
            if (
                bullet.x < asteroid.x + asteroid.width &&
                bullet.x + bullet.width > asteroid.x &&
                bullet.y < asteroid.y + asteroid.height &&
                bullet.y + bullet.height > asteroid.y
            ) {
                bullets.splice(bulletIndex, 1);
                asteroids.splice(asteroidIndex, 1);
                score++;
                document.getElementById("score").innerText = score;
            }
        });
    });
}

// Game loop
function gameLoop() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullets();
    drawAsteroids();
    checkCollisions();
    animationId = requestAnimationFrame(gameLoop);
}

// Restart button logic
restartBtn.addEventListener("click", () => {
    // Reset game state
    spaceship.x = canvas.width / 2 - 25;
    spaceship.y = canvas.height - 100;
    bullets = [];
    asteroids = [];
    score = 0;
    isGameOver = false;
    document.getElementById("score").innerText = score;
    restartBtn.style.display = "none";
    generateAsteroids();
    gameLoop();
});

// Start the game
generateAsteroids();
gameLoop();