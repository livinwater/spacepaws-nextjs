export interface Tile {
  id: string;
  color: string;
  isMatched: boolean;
  isBomb: boolean;
  position: { x: number; y: number };
}
