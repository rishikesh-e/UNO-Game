import { Card } from "./card";

export interface Player {
  id: String;
  name?: String;
  isBot: boolean;
  hand: Card[];
  hasUnoCalled?: boolean;
}
