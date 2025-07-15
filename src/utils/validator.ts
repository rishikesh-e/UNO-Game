import { Card } from "../models/card";

export function isValidMove(card: Card, topCard?: Card): boolean {
  if (!topCard) return true;

  return (
    card.color === topCard.color ||
    card.value === topCard.value ||
    card.color === "wild"
  );
}
