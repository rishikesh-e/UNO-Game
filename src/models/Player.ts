import { Card } from "./card"

export interface Player {
    id: string
    name?: string
    isBot: boolean
    hand: Card[]
    hasUnoCalled?: boolean
}