const express = require('express');
const { createPlayerSpell, getPlayerSpellByPlayerIdAndSpellId } = require('../db');
const router = express.Router();

router.post("/", async (req, res, next) => {
    const { playerId, spellId } = req.body;
    try {
        if (await getPlayerSpellByPlayerIdAndSpellId(playerId, spellId)) {
            res.send({
                name: "PlayerSpellAlreadyExists",
                message: "That spell is already on this players list!"
            });
        } else {
            const playerSpell = await createPlayerSpell(playerId, spellId);
            res.send(playerSpell);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;