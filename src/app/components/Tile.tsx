// app/components/Tile.tsx

"use client";

import React, { useRef } from "react";
import { Tile as TileType } from "../types";

interface TileProps {
  tile: TileType;
  onSwap: (fromTile: TileType, direction: { x: number; y: number }) => void;
}

const Tile: React.FC<TileProps> = ({ tile, onSwap }) => {
  const pointerStartPosition = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
    // Capture the pointer to continue receiving events even if it moves outside the element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartPosition.current) return;

    const deltaX = e.clientX - pointerStartPosition.current.x;
    const deltaY = e.clientY - pointerStartPosition.current.y;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    const threshold = 30; // Minimum movement in pixels to be considered a swipe

    // Determine the direction of the swipe
    let direction: { x: number; y: number } | null = null;
    if (absDeltaX > absDeltaY && absDeltaX > threshold) {
      // Horizontal swipe
      direction = { x: deltaX > 0 ? 1 : -1, y: 0 };
    } else if (absDeltaY > absDeltaX && absDeltaY > threshold) {
      // Vertical swipe
      direction = { x: 0, y: deltaY > 0 ? 1 : -1 };
    }

    if (direction) {
      onSwap(tile, direction);
    }

    pointerStartPosition.current = null;
    // Release the pointer capture
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className={`grid-tile ${tile.color}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none" }} // Prevent default touch behaviors like scrolling
    >
      {/* Optionally display tile content */}
    </div>
  );
};

export default Tile;
