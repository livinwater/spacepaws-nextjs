// app/components/MoveCounter.tsx

"use client";

import React, { useContext } from "react";
import { Match3GameContext } from "../context/Match3GameContext";

const MoveCounter: React.FC = () => {
  const gameState = useContext(Match3GameContext);

  if (!gameState) return null;

  return (
    <div className="move-counter">
      <p>Moves Left: {gameState.movesLeft}</p>
      <p>Level: {gameState.currentLevelId}</p>
    </div>
  );
};

export default MoveCounter;
