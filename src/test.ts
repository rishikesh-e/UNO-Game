import { generateDeck } from "./logic/deck";
//Tested the cards, working fine
const deck = generateDeck();
console.log("Deck size:", deck.length);
console.log("108 cards:", deck.slice(0, 108));
