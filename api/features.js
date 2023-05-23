const express = require('express');
const router = express.Router();
const {
    createFeature,
    updateFeature,
    deleteFeature,
    getAllFeatures,
    getFeatureById,
    getFeatureByName,
    getFeaturesByPlayerId,
    deletePlayerFeaturesByFeatureId
} = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const features = await getAllFeatures();
        res.send(features);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.get("/:featureId", async (req, res, next) => {
    try {
        const feature = await getFeatureById(req.params.featureId);
        res.send(feature);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.get("/player/:playerId", async (req, res, next) => {
    try {
        const features = await getFeaturesByPlayerId(req.params.playerId);
        res.send(features);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.post("/", async (req, res, next) => {
    const { name } = req.body;
    try {
        if (await getFeatureByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot add feature ${name}, ${name} already exists!`
            });
        } else {
            const feature = await createFeature(req.body);
            res.send(feature);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.patch("/:featureId", async (req, res, next) => {
    const { featureId } = req.params;
    const { name } = req.body;
    try {
        const feature = await getFeatureById(featureId);
        if (feature.name !== name && await getFeatureByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot change feature name to ${name}, ${name} already exists!`
            });
        } else {
            const updatedFeature = await updateFeature(featureId, req.body);
            res.send(updatedFeature);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/:featureId", async (req, res, next) => {
    const { featureId } = req.params;
    try {
        const feature = await getFeatureById(featureId);
        if (feature) {
            const deletedPlayerFeatures = await deletePlayerFeaturesByFeatureId(featureId);
            if (deletedPlayerFeatures) {
                const deletedFeature = await deleteFeature(featureId);
                res.send(deletedFeature);
            };
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;