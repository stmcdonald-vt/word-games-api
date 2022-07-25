const levels = require("../../data/soup-levels");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jsonParser = require("body-parser").json();

router.get("/", (req, res) => {
  // Return game object for soup
  res.send("Main Soup Route");
});

router.get("/levels", (req, res) => {
  // Return list of levels
  res.send(levels.map((lvl) => lvl.id));
});

router.get("/level/:id", (req, res, next) => {
  const schema = Joi.number()
    .min(0)
    .max(levels.length - 1);
  const { error } = schema.validate(req.params.id);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // Return specific level based on id
  let gameData = levels[req.params.id];
  res.send({
    letters: gameData.letters,
    lengths: gameData.answers.map((str) => str.length),
  });
});

router.post("/validate", jsonParser, (req, res) => {
  const schema = Joi.object({
    level: Joi.number()
      .min(0)
      .max(levels.length - 1)
      .required(),
    guess: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Check request for valid response
  res.send(
    levels[req.body.level].answers.includes(req.body.guess.toUpperCase())
  );
});

module.exports = router;
