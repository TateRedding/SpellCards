const express = require('express');
const router = express.Router();
const {
    createPlayerFeature,
    deletePlayerFeature,
    getPlayerFeatureByPlayerIdAndFeatureId,
} = require('../db');

router.post("/", async (req, res, next) => {
    const { playerId, featureId } = req.body;
    try {
        if (await getPlayerFeatureByPlayerIdAndFeatureId(playerId, featureId)) {
            res.send({
                name: "PlayerFeatureAlreadyExists",
                message: "That feature is already on this players list!"
            });
        } else {
            const playerFeature = await createPlayerFeature(playerId, featureId);
            res.send(playerFeature);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/:playerFeatureId", async (req, res, next) => {
    try {
        const playerFeature = await deletePlayerFeature(req.params.playerFeatureId);
        res.send(playerFeature);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;