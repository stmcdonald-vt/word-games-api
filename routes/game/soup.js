const levels = require("../../data/soup-levels");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.get("/", (req, res) => {
    // Return game object for soup
    res.send("Main Soup Route");
});

router.get("/levels", (req, res) => {
    // Return list of levels
    res.send(levels.map((lvl) => lvl.id));
});

router.get("/level/:id", (req, res, next) => {
    const schema = Joi.number().min(0).max(levels.length - 1);
    const { error } = schema.validate(req.params.id);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    // Return specific level based on id
    let gameData = levels[req.params.id];
    res.send({
        letters: gameData.letters,
        lengths: gameData.answers.map((str) => str.length),
    });
});

router.post("/validate", (req, res) => {
    const schema = Joi.object({
        level: Joi.number().max(levels.length - 1),
        guess: Joi.string().pattern(new RegExp('[a-zA-Z]+'))
    })
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    
    // Check request for valid response
    // body must indicate a level id
    res.send(true);
});

module.exports = router;
