// app/context/GameContext.tsx

"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import levelsData from "../data/levels";

interface GameState {
  totalPoints: number;
  resources: {
    silica: number;
    metal: number;
    crystal: number;
  };
  updatePoints: (points: number) => void;
  updateResources: (resource: string, amount: number) => void;
}

export const GameContext = createContext<GameState | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [resources, setResources] = useState({
    silica: 0,
    metal: 0,
    crystal: 0,
  });

  const updatePoints = (points: number) => {
    setTotalPoints((prev) => prev + points);
  };

  const updateResources = (resource: string, amount: number) => {
    setResources((prev) => ({
      ...prev,
      [resource]: (prev as any)[resource] + amount,
    }));
  };

  return (
    <GameContext.Provider
      value={{ totalPoints, resources, updatePoints, updateResources }}
    >
      {children}
    </GameContext.Provider>
  );
};
