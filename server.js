const serverless = require('serverless-http');
const express = require("express");
const app = express();
const cors = require("cors")

const gameRouter = require("./routes/game/game");
gameRouter.use(cors());
app.use("/game", gameRouter);
app.use(express.json());

module.exports = app.listen(3000);
module.exports.handler = serverless(app);