const express = require('express');
const router = express.Router();
const {
    createPlayerTrait,
    deletePlayerTrait,
    getPlayerTraitByPlayerIdAndTraitId,
} = require('../db');

router.post("/", async (req, res, next) => {
    const { playerId, traitId } = req.body;
    try {
        if (await getPlayerTraitByPlayerIdAndTraitId(playerId, traitId)) {
            res.send({
                name: "PlayerTraitAlreadyExists",
                message: "That trait is already on this players list!"
            });
        } else {
            const playerTrait = await createPlayerTrait(playerId, traitId);
            res.send(playerTrait);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/:playerTraitId", async (req, res, next) => {
    try {
        const playerTrait = await deletePlayerTrait(req.params.playerTraitId);
        res.send(playerTrait);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;