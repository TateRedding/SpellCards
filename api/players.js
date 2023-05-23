const express = require('express');
const { getAllPlayers, getPlayerByName } = require('../db');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const players = await getAllPlayers();
        res.send(players);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;