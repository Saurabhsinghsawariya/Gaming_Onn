import { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Types
interface Position {
  x: number;
  y: number;
}

// Styled Components and Animations
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #EC4899;
    --secondary: #7C3AED;
    --accent: #10B981;
    --background: #030712;
  }
`;

const glowAnimation = keyframes`
  from {
    text-shadow: 0 0 10px var(--primary),
                 0 0 20px var(--primary),
                 0 0 30px var(--secondary);
  }
  to {
    text-shadow: 0 0 20px var(--primary),
                 0 0 30px var(--primary),
                 0 0 40px var(--secondary);
  }
`;

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--background);
  overflow: hidden;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #fff;
  position: relative;
`;

const GameCanvas = styled.canvas`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.98));
  image-rendering: pixelated;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  pointer-events: none;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 20px rgba(236, 72, 153, 0.5);
  animation: ${glowAnimation} 3s ease-in-out infinite alternate;
`;

const Score = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 2rem;
  font-weight: 600;
  color: var(--accent);
  text-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
  letter-spacing: 2px;
`;

const Modal = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid var(--primary);
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.3);
  z-index: 20;
  text-align: center;
`;

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('right');
  const [gameLoop, setGameLoop] = useState<number | null>(null);

  const GRID_SIZE = 20;
  const GAME_SPEED = 100;

  const initGame = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  const placeFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * (window.innerWidth / GRID_SIZE)),
      y: Math.floor(Math.random() * (window.innerHeight / GRID_SIZE))
    };
    setFood(newFood);
  };

  const gameStep = () => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'up': head.y -= 1; break;
        case 'down': head.y += 1; break;
        case 'left': head.x -= 1; break;
        case 'right': head.x += 1; break;
      }

      // Check collisions
      if (
        head.x < 0 || 
        head.x >= window.innerWidth / GRID_SIZE ||
        head.y < 0 || 
        head.y >= window.innerHeight / GRID_SIZE ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        if (gameLoop) clearInterval(gameLoop);
        return prevSnake;
      }

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        placeFood();
      } else {
        newSnake.pop();
      }

      newSnake.unshift(head);
      return newSnake;
    });
  };

  const drawGame = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#EC4899' : '#7C3AED';
      ctx.shadowColor = index === 0 ? '#EC4899' : '#7C3AED';
      ctx.shadowBlur = index === 0 ? 20 : 10;
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
      );
    });

    // Draw food
    ctx.fillStyle = '#10B981';
    ctx.shadowColor = '#10B981';
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
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp': if (direction !== 'down') setDirection('up'); break;
      case 'ArrowDown': if (direction !== 'up') setDirection('down'); break;
      case 'ArrowLeft': if (direction !== 'right') setDirection('left'); break;
      case 'ArrowRight': if (direction !== 'left') setDirection('right'); break;
    }
  };

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('right');
    setScore(0);
    setGameOver(false);
    placeFood();
    const newGameLoop = setInterval(gameStep, GAME_SPEED);
    setGameLoop(newGameLoop);
  };

  useEffect(() => {
    initGame();
    window.addEventListener('keydown', handleKeyPress);
    restartGame();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameLoop) clearInterval(gameLoop);
    };
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(drawGame);
    return () => cancelAnimationFrame(animationFrame);
  }, [snake, food]);

  return (
    <>
      <GlobalStyle />
      <GameContainer>
        <GameCanvas ref={canvasRef} />
        <Overlay>
          <Title>Snake Game</Title>
          <Score>Score: {score}</Score>
        </Overlay>
        
        <Modal isVisible={gameOver}>
          <h2 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '1rem' }}>
            Game Over!
          </h2>
          <p>Final Score: {score}</p>
          <button
            onClick={restartGame}
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              border: 'none',
              color: 'white',
              padding: '0.8rem 2rem',
              borderRadius: '0.5rem',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            Play Again
          </button>
        </Modal>
      </GameContainer>
    </>
  );
};

export default SnakeGame;