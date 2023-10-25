// ScoreBoard.js
import React from 'react';

const ScoreBoard = ({ xScore, oScore, winner }) => {
  let winnerMessage = '';

  if (winner === 'X') {
    winnerMessage = 'Pemain X Menang!';
  } else if (winner === 'O') {
    winnerMessage = 'Pemain O Menang!';
  }

  return (
    <div className="scoreboard">
      <div className="score">
        <span>X: {xScore}</span>
      </div>
      <div className="score">
        <span>O: {oScore}</span>
      </div>
      <div className="winner-message">
        {winnerMessage}
      </div>
    </div>
  );
};

export default ScoreBoard;
