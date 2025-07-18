import { Card } from "./card";
import { Player } from "./Player";

class GameState {
  id: string = "";
  players: Player[] = [];
  currentPlayerIndex: number = 0;
  direction: 1 | -1 = 1;
  topCard!: Card;
  discardPile: Card[] = [];
  drawPile: Card[] = [];
  gameStarted: boolean = false;
  winnerId?: string;

  get currentPlayerId(): string {
    return this.players[this.currentPlayerIndex]?.id;
  }

  public advanceTurn(): void {
    const len = this.players.length;
    this.currentPlayerIndex =
      (this.currentPlayerIndex + this.direction + len) % len;
  }

  public nextPlayerIndex(): number {
    const len = this.players.length;
    return (this.currentPlayerIndex + this.direction + len) % len;
  }

  public reverseDirection(): void {
    this.direction *= -1;
  }

  get getTopCard(): Card {
    return this.discardPile[this.discardPile.length-1]
  }
}

export default GameState;
