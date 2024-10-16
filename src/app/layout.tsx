// app/layout.tsx

import React from "react";
import WalletContextProvider from "./components/WalletContextProvider";
import { GameProvider } from "./context/GameContext";
import "./globals.css";

export const metadata = {
  title: "Match-3 Game",
  description: "A Match-3 game with Solana wallet integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          <GameProvider>{children}</GameProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
