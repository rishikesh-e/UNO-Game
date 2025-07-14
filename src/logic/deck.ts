import { Card } from "../models/card";
import { CardColor, CardValue } from "../models/enums";
import shuffle from "../utils/shuffle";

export function generateDeck(): Card[] {
  const deck: Card[] = [];
  const colors: CardColor[] = [
    CardColor.Red,
    CardColor.Blue,
    CardColor.Green,
    CardColor.Yellow,
  ];
  const numberValues: CardValue[] = [
    CardValue.Zero,
    CardValue.One,
    CardValue.Two,
    CardValue.Three,
    CardValue.Four,
    CardValue.Five,
    CardValue.Six,
    CardValue.Seven,
    CardValue.Eight,
    CardValue.Nine,
  ];
  const actionValues: CardValue[] = [
    CardValue.Block,
    CardValue.Reverse,
    CardValue.DrawTwo,
  ];
  for (const color of colors) {
    deck.push({ color, value: CardValue.Zero });
    for (const value of [...numberValues.slice(1), ...actionValues]) {
      deck.push({ color, value });
      deck.push({ color, value });
    }
  }
  for (let i: number = 0; i < 4; i++) {
    deck.push({ color: CardColor.Wild, value: CardValue.Wild });
    deck.push({ color: CardColor.Wild, value: CardValue.WildDrawFour });
  }
  return shuffle(deck);
}
