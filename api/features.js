const express = require('express');
const router = express.Router();
const { getAllFeatures } = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const features = await getAllFeatures();
        res.send(features);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;