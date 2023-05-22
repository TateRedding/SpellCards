const express = require('express');
const router = express.Router();
const { getAllSpells } = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const spells = await getAllSpells();
        res.send(spells);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;