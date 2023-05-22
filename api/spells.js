const express = require('express');
const router = express.Router();
const { createSpell, getAllSpells, getSpellById, deleteSpell, deletePlayerSpellsBySpellId } = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const spells = await getAllSpells();
        res.send(spells);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.post("/", async (req, res, next) => {
    try {
        const spell = await createSpell(req.body);
        res.send(spell);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/:spellId", async (req, res, next) => {
    const { spellId } = req.params;
    try {
        const spell = await getSpellById(spellId);
        if (spell) {
            const deletedPlayerSpells = await deletePlayerSpellsBySpellId(spellId);
            if (deletedPlayerSpells) {
                const deletedSpell = await deleteSpell(req.params.spellId);
                res.send(deletedSpell);
            };
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;