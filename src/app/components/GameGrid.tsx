"use client";

import React, { useContext, useEffect, useState } from "react";
import { Match3GameContext } from "../context/Match3GameContext";
import { GameContext } from "../context/GameContext";
import TileComponent from "./Tile"; // Import the Tile component
import { Tile } from "../types/index";

const possibleColors = ["blue", "green", "red", "yellow"];

const GameGrid: React.FC = () => {
  const match3GameState = useContext(Match3GameContext);
  const gameContext = useContext(GameContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const [grid, setGrid] = useState<Tile[][]>([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [firstTile, setFirstTile] = useState<Tile | null>(null);

  useEffect(() => {
    if (match3GameState) {
      initializeGrid();
    }
  }, [match3GameState?.currentLevelId]);

  const initializeGrid = () => {
    if (!match3GameState) return;

    const { width, height } = match3GameState.currentLevelData;
    const newGrid: Tile[][] = [];

    for (let x = 0; x < width; x++) {
      newGrid[x] = [];
      for (let y = 0; y < height; y++) {
        const color = randomColor();
        newGrid[x][y] = {
          id: `${x}-${y}`,
          color,
          isMatched: false,
          isBomb: false,
          position: { x, y },
        };
      }
    }

    setGrid(newGrid);
  };

  const randomColor = () => {
    return possibleColors[Math.floor(Math.random() * possibleColors.length)];
  };

  const handleSwap = (tile: Tile, direction: { x: number; y: number }) => {
    if (isProcessing || isSwapping) return;
    const targetPosition = {
      x: tile.position.x + direction.x,
      y: tile.position.y + direction.y,
    };

    // Check if target position is within grid bounds
    const { width, height } = match3GameState!.currentLevelData;
    if (
      targetPosition.x < 0 ||
      targetPosition.x >= width ||
      targetPosition.y < 0 ||
      targetPosition.y >= height
    ) {
      return; // Can't swap outside the grid
    }

    const targetTile = grid[targetPosition.x][targetPosition.y];
    if (targetTile) {
      swapTiles(tile, targetTile);
    }
  };

  const areAdjacent = (
    pos1: { x: number; y: number },
    pos2: { x: number; y: number }
  ) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  const swapTiles = async (tile1: Tile, tile2: Tile) => {
    setIsSwapping(true);
    setIsProcessing(true); // Start processing
    const newGrid = [...grid];

    // Swap the tiles in the grid
    newGrid[tile1.position.x][tile1.position.y] = tile2;
    newGrid[tile2.position.x][tile2.position.y] = tile1;

    // Update positions
    const tempPos = { ...tile1.position };
    tile1.position = { ...tile2.position };
    tile2.position = tempPos;

    setGrid(newGrid);

    // Wait for visual swap
    await sleep(300); // Adjust timing as needed

    // Check for matches
    const matches = findMatches(newGrid);
    if (matches.length > 0) {
      // Decrease moves left
      match3GameState!.updateGameState({
        movesLeft: match3GameState!.movesLeft - 1,
      });
      await handleMatches(matches);
    } else {
      // Swap back if no match
      // Swap back the tiles
      newGrid[tile1.position.x][tile1.position.y] = tile2;
      newGrid[tile2.position.x][tile2.position.y] = tile1;

      // Update positions back
      const tempPos = { ...tile1.position };
      tile1.position = { ...tile2.position };
      tile2.position = tempPos;

      setGrid(newGrid);

      // Wait for visual swap back
      await sleep(300); // Adjust timing as needed
    }
    setIsSwapping(false);
    setIsProcessing(false); // Processing complete
  };

  const findMatches = (gridToCheck: Tile[][]) => {
    const matches: Tile[] = [];
    const { width, height } = match3GameState!.currentLevelData;

    // Horizontal matches
    for (let y = 0; y < height; y++) {
      let matchLength = 1;
      for (let x = 0; x < width; x++) {
        const currentTile = gridToCheck[x][y];
        const nextTile = x < width - 1 ? gridToCheck[x + 1][y] : null;

        if (nextTile && currentTile.color === nextTile.color) {
          matchLength++;
        } else {
          if (matchLength >= 3) {
            for (let k = 0; k < matchLength; k++) {
              matches.push(gridToCheck[x - k][y]);
            }
          }
          matchLength = 1;
        }
      }
    }

    // Vertical matches
    for (let x = 0; x < width; x++) {
      let matchLength = 1;
      for (let y = 0; y < height; y++) {
        const currentTile = gridToCheck[x][y];
        const nextTile = y < height - 1 ? gridToCheck[x][y + 1] : null;

        if (nextTile && currentTile.color === nextTile.color) {
          matchLength++;
        } else {
          if (matchLength >= 3) {
            for (let k = 0; k < matchLength; k++) {
              matches.push(gridToCheck[x][y - k]);
            }
          }
          matchLength = 1;
        }
      }
    }

    return matches;
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleMatches = async (matches: Tile[]) => {
    const newGrid = [...grid];
    let bluePiecesMatched = 0;
    let pointsEarned = 0;

    // Remove matched tiles
    matches.forEach((tile) => {
      if (tile.color === "blue") {
        bluePiecesMatched++;
      }
      pointsEarned += 10; // Or calculate based on tile value
      newGrid[tile.position.x][tile.position.y] = null;
    });

    // Update game state
    match3GameState!.updateGameState({
      bluePiecesCleared: match3GameState!.bluePiecesCleared + bluePiecesMatched,
      currentScore: match3GameState!.currentScore + pointsEarned,
    });

    if (gameContext) {
      gameContext.updatePoints(pointsEarned);
    }

    console.log("Matches found:", matches);
    console.log("Points earned this round:", pointsEarned);
    console.log(
      "Total blue pieces cleared:",
      match3GameState!.bluePiecesCleared
    );

    // Update grid state after removing matched tiles
    setGrid([...newGrid]);

    // Wait for visual removal of tiles
    await sleep(300); // Adjust timing as needed

    // Collapse columns and refill grid
    collapseColumns(newGrid);
    refillGrid(newGrid);
    console.log("Grid after collapse and refill:", newGrid);

    // Update grid state after collapsing and refilling
    setGrid([...newGrid]);

    // Wait for visual collapse and refill
    await sleep(300); // Adjust timing as needed

    // Find new matches in the updated grid
    const newMatches = findMatches(newGrid);

    if (newMatches.length > 0) {
      await handleMatches(newMatches); // Recursively handle new matches
    } else {
      // No more matches, check for game over
      checkGameOver();
      setIsProcessing(false); // Processing complete
    }
  };

  const collapseColumns = (gridToUpdate: (Tile | null)[][]) => {
    const { width, height } = match3GameState!.currentLevelData;

    for (let x = 0; x < width; x++) {
      let emptySlotIndex = height - 1;

      for (let y = height - 1; y >= 0; y--) {
        if (gridToUpdate[x][y] !== null) {
          gridToUpdate[x][emptySlotIndex] = gridToUpdate[x][y];
          if (emptySlotIndex !== y) {
            gridToUpdate[x][emptySlotIndex]!.position.y = emptySlotIndex;
            gridToUpdate[x][y] = null;
          }
          emptySlotIndex--;
        }
      }
    }
  };

  const refillGrid = (gridToUpdate: (Tile | null)[][]) => {
    const { width, height } = match3GameState!.currentLevelData;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (gridToUpdate[x][y] === null) {
          const color = randomColor();
          gridToUpdate[x][y] = {
            id: `${x}-${y}-${Date.now()}`,
            color,
            isMatched: false,
            isBomb: false,
            position: { x, y },
          };
        }
      }
    }
  };

  const checkGameOver = () => {
    if (match3GameState!.bluePiecesCleared >= match3GameState!.blueGoal) {
      // Level complete
      alert("Level Complete!");
      // Proceed to next level or end game
    } else if (match3GameState!.movesLeft <= 0) {
      // Game over
      alert("Game Over!");
    } else {
      // Continue game
    }
  };

  return (
    <div className="game-grid">
      {grid.map((column, x) => (
        <div className="grid-column" key={x}>
          {column
            .filter((tile) => tile !== null)
            .map((tile, y) => (
              <TileComponent key={tile!.id} tile={tile!} onSwap={handleSwap} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
