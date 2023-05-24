const express = require('express');
const { getAllPlayers, getPlayerByName, getPlayerById } = require('../db');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const players = await getAllPlayers();
        res.send(players);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.get("/:playerId", async (req, res, next) => {
    try {
        const player = await getPlayerById(req.params.playerId);
        res.send(player);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;