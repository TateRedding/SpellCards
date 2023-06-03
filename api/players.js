const express = require('express');
const router = express.Router();
const { getAllPlayers, getPlayerById } = require('../db');

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