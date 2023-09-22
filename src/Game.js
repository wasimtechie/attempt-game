import React, { useState, useEffect } from 'react';

const getRandomNumber = () => Math.floor(Math.random() * 100);

const Game = () => {
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [luckyAttempts, setLuckyAttempts] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (!gameEnded && questionCount < 10) {
      const newNumber = getRandomNumber();
      setDisplayedNumber(newNumber);

      const correctOptionIndex = Math.floor(Math.random() * 3);
      const newOptions = Array.from({ length: 3 }, (_, index) =>
        index === correctOptionIndex ? newNumber : getRandomNumber()
      );

      setOptions(newOptions);
    }
  }, [gameEnded, questionCount]);

  const handleOptionClick = (selectedNumber) => {
    if (!gameEnded) {
      setGameEnded(true);

      if (selectedNumber === displayedNumber) {
        setLuckyAttempts(luckyAttempts + 1);
      } else {
        setWrongAttempts(wrongAttempts + 1);
      }
    }
  };

  const nextQuestion = () => {
    setGameEnded(false);
    setQuestionCount(questionCount + 1);
  };

  const calculateLuckFactor = () => {
    if (luckyAttempts >= 7) {
      return 'Excellent Luck';
    } else if (luckyAttempts >= 4) {
      return 'Good Luck';
    } else {
      return 'Bad Luck';
    }
  };

  const resetGame = () => {
    setGameEnded(false);
    setQuestionCount(0);
    setLuckyAttempts(0);
    setWrongAttempts(0);
  };

  return (
    <div className='bg-info ' style={{height:'100vh'}}>
    <div className="container  game-container" style={{padding:'100px'}}>
      {questionCount < 10 ? (
        <div>
          <div className='d-flex justify-content-around'>
            <div className="attempts justify-content-start">
              <div className="question-count ">Question {questionCount + 1} of 10</div>
            </div>
            <div className=' align-items-center px-5'>
              <p>Lucky Attempts: {luckyAttempts}</p>
              <p>Wrong Attempts: {wrongAttempts}</p>
            </div>
          </div>
          <div className="pt-3 random-number text-center"><h1>{displayedNumber}</h1></div>
          <div className='pt-3 text-center'>
          {options.map((option, index) => (
            <button
            className='btn btn-primary m-3'
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={gameEnded}
            >
              {gameEnded ? option : 'Click Me'}
            </button>
          ))}
          {gameEnded && (
            <button className='btn btn-success' onClick={nextQuestion}>Next Question</button>
          )}
        </div>
        </div>
      ) : (
        <div className="result-message">
          <p>Your Luck Factor: {calculateLuckFactor()}</p>
          <p>Lucky Attempts: {luckyAttempts}</p>
          <p>Wrong Attempts: {wrongAttempts}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Game;
