const serverless = require('serverless-http');
const express = require("express");
const app = express();

const gameRouter = require("./routes/game/game");
app.use("/game", gameRouter);

module.exports = app.listen(3000);
module.exports.handler = serverless(app);