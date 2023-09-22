const express = require('express');
const router = express.Router();
const {
    createTrait,
    updateTrait,
    deleteTrait,
    getAllTraits,
    getTraitById,
    getTraitByName,
    deletePlayerTraitsByTraitId
} = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const traits = await getAllTraits();
        res.send(traits);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.get("/:traitId", async (req, res, next) => {
    try {
        const trait = await getTraitById(req.params.traitId);
        res.send(trait);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.post("/", async (req, res, next) => {
    const { name } = req.body;
    try {
        if (await getTraitByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot add trait ${name}, ${name} already exists!`
            });
        } else {
            const trait = await createTrait(req.body);
            res.send(trait);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.patch("/:traitId", async (req, res, next) => {
    const { traitId } = req.params;
    const { name } = req.body;
    try {
        const trait = await getTraitById(traitId);
        if (trait.name !== name && await getTraitByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot change trait name to ${name}, ${name} already exists!`
            });
        } else {
            const updatedTrait = await updateTrait(traitId, req.body);
            res.send(updatedTrait);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/:traitId", async (req, res, next) => {
    const { traitId } = req.params;
    try {
        const trait = await getTraitById(traitId);
        if (trait) {
            const deletedPlayerTraits = await deletePlayerTraitsByTraitId(traitId);
            if (deletedPlayerTraits) {
                const deletedTrait = await deleteTrait(traitId);
                res.send(deletedTrait);
            };
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;