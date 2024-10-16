// app/context/Match3GameContext.tsx

"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import levelsData from "../data/levels";

interface LevelData {
  moves: number;
  blue_goal: number;
  width: number;
  height: number;
  empty_spaces: [number, number][];
  next_level_id: number | null;
}

interface Match3GameState {
  currentLevelId: number;
  currentLevelData: LevelData;
  movesLeft: number;
  blueGoal: number;
  bluePiecesCleared: number;
  currentScore: number;
  updateGameState: (updates: Partial<Match3GameState>) => void;
}

export const Match3GameContext = createContext<Match3GameState | null>(null);

export const Match3GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [currentLevelData, setCurrentLevelData] = useState<LevelData>(
    levelsData["1"]
  );
  const [movesLeft, setMovesLeft] = useState(currentLevelData.moves);
  const [blueGoal, setBlueGoal] = useState(currentLevelData.blue_goal);
  const [bluePiecesCleared, setBluePiecesCleared] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const levelData = levelsData[currentLevelId.toString()];
    setCurrentLevelData(levelData);
    setMovesLeft(levelData.moves);
    setBlueGoal(levelData.blue_goal);
    setBluePiecesCleared(0);
    setCurrentScore(0);
  }, [currentLevelId]);

  const updateGameState = (updates: Partial<Match3GameState>) => {
    if (updates.currentLevelId !== undefined)
      setCurrentLevelId(updates.currentLevelId);
    if (updates.movesLeft !== undefined) setMovesLeft(updates.movesLeft);
    if (updates.blueGoal !== undefined) setBlueGoal(updates.blueGoal);
    if (updates.bluePiecesCleared !== undefined)
      setBluePiecesCleared(updates.bluePiecesCleared);
    if (updates.currentScore !== undefined)
      setCurrentScore(updates.currentScore);
  };

  return (
    <Match3GameContext.Provider
      value={{
        currentLevelId,
        currentLevelData,
        movesLeft,
        blueGoal,
        bluePiecesCleared,
        currentScore,
        updateGameState,
      }}
    >
      {children}
    </Match3GameContext.Provider>
  );
};
