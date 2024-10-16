// app/page.tsx

"use client";

import React, { useState } from "react";
import MainMenu from "./components/MainMenu";
import GameHub from "./components/GameHub";

const HomePage: React.FC = () => {
  const [isGameHubVisible, setIsGameHubVisible] = useState(false);

  const handleEnterGameHub = () => {
    setIsGameHubVisible(true);
  };

  const handleExitGame = () => {
    setIsGameHubVisible(false);
  };

  return (
    <div>
      {!isGameHubVisible ? (
        <MainMenu onEnterGameHub={handleEnterGameHub} />
      ) : (
        <GameHub onExitGame={handleExitGame} />
      )}
    </div>
  );
};

export default HomePage;
