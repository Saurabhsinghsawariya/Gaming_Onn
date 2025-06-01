import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Games: React.FC = () => {
  const location = useLocation();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#060809",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Show back arrow only on /games route */}
      {location.pathname === "/games" && (
        <a
          href="http://localhost:5173"
          style={{
            position: "fixed",
            top: "30px",
            left: "30px",
            color: "#3B82F6",
            background: "#1E293B",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            zIndex: 1000,
            textDecoration: "none",
            fontSize: "28px",
            border: "2px solid #3B82F6",
            transition: "background 0.2s, color 0.2s",
          }}
          title="Back"
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#3B82F6";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#1E293B";
            (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6";
          }}
        >
          <FaArrowLeft />
        </a>
      )}
      <div
        className="game-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        {[
          { name: "Ludo", img: "games/ludo/ludo/ludo.webp", link: "games/ludo/ludo/index.html" },
          { name: "Snake", img: "games/snake/snake/snake.webp", link: "games/snake/snake/index.html" },
          { name: "Tic Tac Toe", img: "games/tik tok toe/tik tok toe/tik.webp", link: "games/tik tok toe/tik tok toe/index.html" },
          { name: "CarDash", img: "games/car/carlogo.jpg", link: "games/car/main_menu.html" },
          { name: "Card Match", img: "games/memory card/memory.jpg", link: "games/memory card/index.html" },
          { name: "Zombie Hunt", img: "games/zombie/zombie.jpg", link: "games/zombie/index.html" },
          { name: "Gun Shoot", img: "games/gun-shoot/gunshoot.gif", link: "games/gun-shoot/index.html" },
          { name: "Biker", img: "games/bike r/biker.jpg", link: "games/bike r/index.html" },
          { name: "Breakout", img: "games/breakout/breakout.jpg", link: "games/breakout/index.html" },
          { name: "Space Shooter", img: "games/game19/space.jpeg", link: "games/game19/index.html" },
          { name: "Hangman", img: "games/hangman/hangman.jpg", link: "games/hangman/index.html" },
          { name: "Fruit Slice", img: "games/fruitslice/fruit.jpeg", link: "games/fruitslice/index.html" },
          { name: "Dungenous", img: "games/dungenous/dungenous.jpg", link: "games/dungenous/index.html" },
          { name: "River Defence", img: "games/river defence/riverdefence.jpg", link: "games/river defence/index.html" },
          { name: "Simon", img: "games/simon game/simon.jpg", link: "games/simon game/index.html" },
          { name: "Sudoku", img: "games/sudoku/sudoku.jpg", link: "games/sudoku/index.html" },
          { name: "Whake a Mole", img: "games/whake a mole/whake.jpg", link: "games/whake a mole/index.html" },
          { name: "ZeroDay", img: "games/zero day/zeroday.jpg", link: "games/zero day/index.html" },
          { name: "Tetris", img: "games/tetris/tetris.png", link: "games/tetris/index.html" },
          { name: "2048", img: "games/2048/2048.png",link:"games/2048/index.html"},
          { name: "flappybird", img: "games/flappybird/bird.webp",link:"games/flappybird/index.html"},
          { name: "Shape", img: "games/shape/shape.jpeg",link:"games/shape/index.html"},
          { name: "Tower", img: "games/tower/tower.png",link:"games/tower/index.html"},
          { name: "Number Guess", img: "games/number guess/number.png",link:"games/number guess/index.html"},
          { name: "Ping Pong", img: "games/pingpong/pingpong.jpeg",link:"games/pingpong/index.html"},
          // ...existing game objects...
        ].map((game, index) => (
          <div
            key={index}
            className="game-card"
            style={{
              backgroundColor: "#1E293B",
              border: "3px solid #3B82F6",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
            }}
          >
            <img
              src={game.img}
              alt={game.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "15px",
                border: "2px solid #3B82F6",
              }}
            />
            <div
              className="game-text-box"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "15px",
              }}
            >
              {game.name}
            </div>
            <div className="game">
              <button
                onClick={() => (window.location.href = game.link)}
                style={{
                  backgroundColor: "#3B82F6",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3B82F6")}
              >
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;