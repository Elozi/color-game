import React, { useState, useEffect } from "react"; 
import './App.css';

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setStatus("");
    setIsCorrect(false);
  };

  const handleGuess = (color) => {
    const correctMessages = [
      "Yaaay that's correct! 🎉🎉🎉",
      "Awesome! You got it right! 🎊🎊🎊",
      "Well done! Keep going! You are becoming a pro 🚀🚀🚀"
    ];
    
    const wrongMessages = [
      "Almost there, You can do this! Try again. ❌❌❌",
      "Oops! Not quite. Give it another shot! 😢😢😢",
      "Oh No! Try again! You can do it! 💡💡💡"
    ];

    if (color === targetColor) {
      setScore(score + 1);
      setStatus(correctMessages[Math.floor(Math.random() * correctMessages.length)]);
      setIsCorrect(true);
      setTimeout(() => {
        startNewGame(); 
      }, 1500);
    } else {
      setStatus(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
      setIsCorrect(false);
    }
  };

  return (
    <div className="game-container">
      <h1 data-testid="gameInstructions" id="game-title">Guess the correct color!</h1>
      <h2 data-testid="gameStatus" className={`game-status ${isCorrect ? 'correct' : 'wrong'}`}>{status}</h2>
      <div
        className="color-box"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className="options-container">
        {colors.map((color) => (
          <button
            key={color}
            className="color-option"
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p data-testid="score" className="score">Score: {score}</p>
      <button data-testid="newGameButton" className="new-game-btn" onClick={() => { setScore(0); startNewGame(); }}>
        New Game
      </button>
    </div>
  );
}

export default App;
