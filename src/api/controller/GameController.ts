import { Request, Response } from "express";
import { gameEngine } from "../../logic/gameEngine";

export class GameController {
  static startGame(req: Request, res: Response) {
    const { playerName } = req.body;
    gameEngine.startGame(); //playerName -> to be passed , implemented later
    res.status(200).json({
      message: "Game started",
      gameSTate: gameEngine.getState(),
    });
  }

  static playCard(req: Request, res: Response) {
    const { playerId, card } = req.body;
    const result = gameEngine.playCard(playerId, card);

    if (result.error) {
      return res.status(400).json({
        error: result.error,
      });
    }
    return res.status(200).json({
      message: "Card played",
      gameState: result.gameState,
    });
  }

  static drawCard(req: Request, res: Response) {
    const { playerId } = req.body;
    const result = gameEngine.drawCard(playerId);

    if (result.error)
      return res.status(400).json({
        error: result.error,
      });
    return res.status(200).json(result);
  }

  static getState(req: Request, res: Response) {
    return res.status(200).json(gameEngine.getState());
  }

  static getPlayerHand(req: Request, res: Response) {
    const { playerId } = req.params;
    const hand = gameEngine.getPlayerHand(playerId);
    return res.status(200).json(hand);
  }

  static getGameState(req: Request, res: Response) {
    return res.status(200).json(gameEngine.getState());
  }

  static getHand(req: Request, res: Response) {
    const { playerId } = req.params;

    const hand = gameEngine.getPlayerHand(playerId);
    if (!hand.length) {
      return res
        .status(404)
        .json({ error: "Player not found or hand is empty" });
    }
    return res.status(200).json({ playerId, hand });
  }
}
