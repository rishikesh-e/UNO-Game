import express from "express";
import { GameController } from "../controller/GameController";

const router = express.Router();

router.post("/start", GameController.startGame);
router.post("/play", GameController.playCard);
router.post("/draw", GameController.drawCard);
router.get("/state", GameController.getGameState);
router.get("/hand/:playerId", GameController.getHand);

export default router;
