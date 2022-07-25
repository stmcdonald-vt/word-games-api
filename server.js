const serverless = require('serverless-http');
const express = require("express");
const app = express();

const gameRouter = require("./routes/game/game");
app.use("/game", gameRouter);
app.use(express.json());

module.exports.handler = serverless(app);
module.exports = app.listen(3000);