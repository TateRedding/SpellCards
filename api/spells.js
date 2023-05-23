const express = require('express');
const router = express.Router();
const {
    createSpell,
    updateSpell,
    deleteSpell,
    getAllSpells,
    getSpellById,
    getSpellByName,
    getSpellsByPlayerId,
    deletePlayerSpellsBySpellId,
} = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const spells = await getAllSpells();
        res.send(spells);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.get("/:spellId", async (req, res, next) => {
    try {
        const spell = await getSpellById(req.params.spellId);
        res.send(spell);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.get("/player/:playerId", async (req, res, next) => {
    try {
        const spells = await getSpellsByPlayerId(req.params.playerId);
        res.send(spells);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.post("/", async (req, res, next) => {
    const { name } = req.body;
    try {
        if (await getSpellByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot add spell ${name}, ${name} already exists!`
            });
        } else {
            const spell = await createSpell(req.body);
            res.send(spell);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.patch("/:spellId", async (req, res, next) => {
    const { spellId } = req.params;
    const { name } = req.body;
    try {
        const spell = await getSpellById(spellId);
        if (spell.name !== name && await getSpellByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot change spell name to ${name}, ${name} already exists!`
            });
        } else {
            const updatedSpell = await updateSpell(spellId, req.body);
            res.send(updatedSpell);
        };
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
                const deletedSpell = await deleteSpell(spellId);
                res.send(deletedSpell);
            };
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;