// app/components/GameHub.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

interface GameHubProps {
  onExitGame: () => void;
}

const GameHub: React.FC<GameHubProps> = ({ onExitGame }) => {
  const router = useRouter();
  const { totalPoints, resources } = useContext(GameContext)!;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="game-hub">
      <h2>Game Hub</h2>
      <div className="resource-counters">
        <p>Total Points: {totalPoints}</p>
        <p>Silica: {resources.silica}</p>
        <p>Metal: {resources.metal}</p>
        <p>Crystal: {resources.crystal}</p>
      </div>
      <div className="icon-grid">
        <div className="icon" onClick={() => handleNavigate("/shop")}>
          <img src="/icons/shop.png" alt="Shop" />
          <p>Shop</p>
        </div>
        <div className="icon" onClick={() => handleNavigate("/buildings")}>
          <img src="/icons/buildings.png" alt="Buildings" />
          <p>Buildings</p>
        </div>
        <div className="icon" onClick={() => handleNavigate("/game")}>
          <p>Play Now</p>
        </div>
        <div className="icon" onClick={() => handleNavigate("/giveaway")}>
          <img src="/icons/giveaway.png" alt="Giveaway" />
          <p>Giveaway</p>
        </div>
      </div>
      <button onClick={onExitGame}>Exit Game</button>
    </div>
  );
};

export default GameHub;
