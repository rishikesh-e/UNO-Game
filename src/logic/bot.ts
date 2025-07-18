import { Card } from "../models/card";
import GameState from "../models/GameState";
import { Player } from "../models/Player";

class BotLogic {
  private gameState: GameState;
  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  private playCard() {
    // Implemented
    let currBot: Player =
      this.gameState.players[this.gameState.currentPlayerIndex];
    let choosenCard: Card | null = this.chooseCard(currBot);
    if (choosenCard === null) {
      let newCard: Card | undefined | null = this.drawCard();
      if (newCard === null || newCard === undefined) {
        return { error: "no cards to draw" };
      } else {
        currBot.hand.push(newCard);
        return { success: true, gameState: this.gameState };
      }
    } else {
      let index: number = currBot.hand.findIndex(
        (c) => c.color === choosenCard.color && c.value === choosenCard.value
      );
      if (index === -1) {
        return { error: "card not in hand" };
      } else {
        this.gameState.discardPile.push(currBot.hand[index]);
        currBot.hand.splice(index, 1);
        this.gameState.advanceTurn();
        return { success: true, gameState: this.gameState };
      }
    }
  }
  public chooseCard(bot: Player): Card | null {
    let topCard: Card = this.gameState.getTopCard;
    for (const card of bot.hand) {
      if (this.isNumberOrColor(card, topCard)) {
        return card;
      } else if (this.isWildCard(card)) {
        return card;
      }
    }
    return null;
  }

  private isNumberOrColor(card: Card, topCard: Card) {
    return card.value === topCard.value || card.color === topCard.color;
  }

  private isWildCard(card: Card) {
    return card.value === "wild" || card.value === "+4";
  }

  private drawCard(): Card | undefined | null {
    if (this.gameState.drawPile.length > 0) {
      let card: Card | undefined = this.gameState.drawPile.pop();
      if (card === undefined) {
        return null;
      } else {
        return card;
      }
    } else {
      return null;
    }
  }
}
