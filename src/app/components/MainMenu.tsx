// app/components/MainMenu.tsx

"use client";

import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface MainMenuProps {
  onEnterGameHub: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onEnterGameHub }) => {
  const { connected } = useWallet();

  return (
    <div className="main-menu">
      <h1>Welcome to the Game</h1>
      <WalletMultiButton />
      {connected && (
        <div className="buttons">
          <button onClick={onEnterGameHub}>Enter Game Hub</button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
