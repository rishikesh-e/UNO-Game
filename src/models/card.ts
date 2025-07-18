import { CardColor, CardValue } from "./enums";

//Defining each card in the deck
export interface Card {
  color: CardColor;
  value: CardValue;
}
