const express = require('express');
const { getAllSpells } = require('../db');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const spells = await getAllSpells();
        res.send(spells);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;