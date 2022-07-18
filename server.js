const express = require("express");
const app = express();

const gameRouter = require("./routes/game/game");
app.use("/game", gameRouter);

app.listen(3000);
