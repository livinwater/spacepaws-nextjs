"use client";

import React, { useContext } from "react";
import { Match3GameContext } from "../context/Match3GameContext";

const GoalCounter: React.FC = () => {
  const gameState = useContext(Match3GameContext);

  if (!gameState) return null;

  const remaining = Math.max(
    0,
    gameState.blueGoal - gameState.bluePiecesCleared
  );

  return (
    <div className="goal-counter">
      <p>Blue Pieces Left: {remaining}</p>
    </div>
  );
};

export default GoalCounter;
