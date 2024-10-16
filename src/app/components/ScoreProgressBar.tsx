"use client";

import React, { useContext } from "react";
import { Match3GameContext } from "../context/Match3GameContext";

const ScoreProgressBar: React.FC = () => {
  const gameState = useContext(Match3GameContext);

  if (!gameState) return null;

  const maxScore = 500; // Or set dynamically based on level

  const progress = Math.min((gameState.currentScore / maxScore) * 100, 100);

  return (
    <div className="score-progress-bar">
      <p>Score: {gameState.currentScore}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ScoreProgressBar;
