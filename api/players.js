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

router.post("/signin", async (req, res, next) => {
    const { id, pin } = req.body;
    try {
        const player = await getPlayerById(id);
        if (Number(pin) === player.pin) {
            res.send(player);
        } else {
            res.send({
                name: "IncorrectPIN",
                message: "Incorrect PIN, try again."
            });
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;