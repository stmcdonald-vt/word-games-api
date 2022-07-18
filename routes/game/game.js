const express = require("express");
const router = express.Router();

// Return a list of games with their metadata
router.get("/", (req, res) => {
    res.send("Main Game Route");
});

const soupRouter = require("./soup.js");
router.use("/soup", soupRouter);

module.exports = router;
