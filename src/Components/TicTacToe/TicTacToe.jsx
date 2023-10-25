import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";
import soundX from "../Assets/soundX.mp3";
import soundO from "../Assets/soundO.mp3";
import soundWin from '../Assets/soundWin.mp3';
import soundReset from '../Assets/soundReset.mp3';
import startGameSound from "../Assets/startGame.mp3";
import ScoreBoard from '../ScoreBoard/ScoreBoard';

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const audioX = new Audio(soundX);
  const audioO = new Audio(soundO);
  const audioWin = new Audio(soundWin);
  const audioReset = new Audio(soundReset);

  const playStartGameSound = () => {
    const audioStartGame = new Audio(startGameSound);
    audioStartGame.play();
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (!gameStarted) {
      return;
    }

    const squaresCopy = [...squares];
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    if (xIsNext) {
      audioO.play();
    } else {
      audioX.play();
    }

    const currentWinner = calculateWinner(squaresCopy);
    if (currentWinner) {
      setWinner(currentWinner);
      audioWin.play();

      if (currentWinner === 'X') {
        setXScore(xScore + 1);
      } else if (currentWinner === 'O') {
        setOScore(oScore + 1);
      }
    }
  };

  const renderSquare = (i) => {
    return (
      <div className="boxes" onClick={() => handleClick(i)}>
        {squares[i] === 'X' && (
          <img src={cross_icon} alt="X" />
        )}
        {squares[i] === 'O' && (
          <img src={circle_icon} alt="O" />
        )}
      </div>
    );
  };

  const resetGame = () => {
    audioReset.play();
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setXScore(0);
    setOScore(0);
    setGameStarted(false);
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe Game <span>React</span></h1>
      <ScoreBoard xScore={xScore} oScore={oScore} winner={winner} />
      <div className="board">
        <div className="row1">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row2">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row3">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset" onClick={() => resetGame()}>
        Reset
      </button>
      {!gameStarted && (
        <button className="start-game" onClick={() => {
          playStartGameSound();
          setGameStarted(true);
        }}>
          Mulai Permainan
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
