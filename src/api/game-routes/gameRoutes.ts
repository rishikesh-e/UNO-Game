import express from "express";
import { GameController } from "../controller/GameController";

const router = express.Router();

router.post("/start", GameController.startGame); // Working fine
router.post("/play", GameController.playCard);  // working fine
router.post("/draw", GameController.drawCard);  // working fine
router.get("/state", GameController.getGameState);  // working fine
router.get("/hand/:playerId", GameController.getHand);  // working fine

export default router;
