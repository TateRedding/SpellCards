const express = require('express');
const router = express.Router();
const {
    createQuest,
    updateQuest,
    deleteQuest,
    getAllQuests,
    getQuestById,
    getQuestByName
} = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const quests = await getAllQuests();
        res.send(quests);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.post("/", async (req, res, next) => {
    const { name } = req.body;
    try {
        if (await getQuestByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot add quest ${name}, ${name} already exists!`
            });
        } else {
            const quest = await createQuest(req.body);
            res.send(quest);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.patch("/questId", async (req, res, next) => {
    const { questId } = req.params;
    const { name } = req.body;
    try {
        const quest = await getQuestById(questId);
        if (quest.name !== name && await getQuestByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot change quest name to ${name}, ${name} already exists!`
            });
        } else {
            const updatedQuest = await updateQuest(questId, req.body);
            res.send(updatedQuest);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/questId", async (req, res, next) => {
    const { questId } = req.params;
    try {
        const quest = await getQuestById(questId);
        if (quest) {
            const deletedQuest = await deleteQuest(questId);
            res.send(deletedQuest);
        }
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;