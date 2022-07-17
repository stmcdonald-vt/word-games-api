const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Main Soup Route")
})

router.get("/level", (req, res) => {
    res.send("The level you requested is SOUP!")
})

router.get("/validate", (req, res) => {
    res.send("You are incorrect")
})

module.exports = router