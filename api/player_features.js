const express = require('express');
const { createPlayerFeature, getPlayerFeatureByPlayerIdAndFeatureId } = require('../db');
const router = express.Router();

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

module.exports = router;