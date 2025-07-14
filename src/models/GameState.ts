import { Card } from "./card";
import { Player } from "./Player";

export interface GameState {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  direction: 1 | -1;
  topCard: Card;
  discardPile: Card[];
  drawPile: Card[];
  gameStarted: boolean;
  winnerId?: string;
}
