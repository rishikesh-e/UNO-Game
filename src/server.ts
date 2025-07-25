import express from "express";
import cors from "cors";
import gameRoutes from "./api/game-routes/gameRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/game", gameRoutes);

app.get("/", (req, res) => {
  res.send("UNO Bot Game Server is running 🎮");
});

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
