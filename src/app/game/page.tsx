// app/game/page.tsx

"use client";

import React from "react";
import { Match3GameProvider } from "../context/Match3GameContext";
import MoveCounter from "../components/MoveCounter";
import GoalCounter from "../components/GoalCounter";
import ScoreProgressBar from "../components/ScoreProgressBar";
import GameGrid from "../components/GameGrid";

const GamePage: React.FC = () => {
  return (
    <Match3GameProvider>
      <div className="game-page">
        <div className="game-header">
          <MoveCounter />
          <GoalCounter />
          <ScoreProgressBar />
        </div>
        <GameGrid />
      </div>
    </Match3GameProvider>
  );
};

export default GamePage;
