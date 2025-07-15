import { Card } from "../models/card";
import GameState from "../models/GameState";
import { Player } from "../models/Player";
import { isValidMove } from "../utils/validator";
import { generateDeck } from "./deck";

export class GameEngine {
  private gameState: GameState = new GameState();

  startGame() {
    const deck: Card[] = generateDeck();
    const players: Player[] = [];

    //Pushing a dummy user
    players.push({
      id: "user123",
      name: "Rishi",
      isBot: false,
      hand: [],
    });

    //Pushing three bots
    for (let i: number = 1; i <= 3; i++) {
      players.push({
        id: `Bot${i}`,
        name: `bot${i}`,
        isBot: true,
        hand: [],
      });
    }

    //giving the cards to players
    for (let player of players) {
      player.hand = deck.slice(0, 7);
    }

    this.gameState.players = players;
    this.gameState.drawPile = deck;
    this.gameState.discardPile.push(this.gameState.drawPile.pop()!);
  }

  public playCard(playerId: string, card: Card) {
    const player: Player | undefined = this.gameState.players.find(
      (p) => p.id == playerId
    );
    if (player == undefined) {
      return { error: "player not found" };
    }
    if (this.gameState.currentPlayerId !== playerId) {
      return { error: "not your turn" };
    }
    const cardIndex = player.hand.findIndex(
      (c) => c.color === card.color && c.value === card.value
    );
    if (cardIndex === -1) {
      return {
        error: "card not in hand",
      };
    }
    const topCard =
      this.gameState.discardPile[this.gameState.discardPile.length - 1];
    if (!isValidMove(card, topCard)) {
      return {
        error: "Invalid move",
      };
    }
    const playedCard = player.hand.splice(cardIndex, 1)[0];
    this.gameState.discardPile.push(playedCard);

    this.applyCardEffect(playedCard);

    if (player.hand.length === 0) {
      this.gameState.winnerId = player.id;
    } else {
      this.gameState.advanceTurn();
    }
    return {
      success: true,
      gameState: this.getState(),
    };
  }

  public drawCard(playerId: string) {
    const player = this.gameState.players.find((p) => p.id === playerId);
    if (!player) {
      return {
        error: "Player not found",
      };
    }
    const card = this.gameState.drawPile.pop();
    if (!card) {
      return {
        error: "No cards left in deck",
      };
    }
    player.hand.push(card);
    return {
      success: true,
      card,
      hand: player.hand,
    };
  }
  public applyCardEffect(card: Card) {
    const nextPlayer = this.gameState.players[this.gameState.nextPlayerIndex()];
    switch (card.value) {
      case "reverse":
        this.gameState.reverseDirection();
        break;
      case "block":
        this.gameState.advanceTurn();
        break;
      case "+2":
        const draw2 = this.gameState.drawPile.splice(0, 2);
        nextPlayer.hand.push(...draw2);
        this.gameState.advanceTurn();
        break;
      case "wild":
        //later
        break;
    }
  }

  getPlayerHand(playerId: string) {
    const player = this.gameState.players.find((p) => p.id === playerId);
    return player?.hand ?? [];
  }

  getState() {
    return this.gameState;
  }
}

export const gameEngine: GameEngine = new GameEngine();
