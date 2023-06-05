const express = require('express');
const router = express.Router();
const {
    createPlayerSpell,
    deletePlayerSpell,
    getPlayerSpellByPlayerIdAndSpellId
} = require('../db');

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

router.delete("/:playerSpellId", async (req, res, next) => {
    try {
        const playerSpell = await deletePlayerSpell(req.params.playerSpellId);
        res.send(playerSpell);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;