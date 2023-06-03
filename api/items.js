const express = require('express');
const router = express.Router();
const {
    createItem,
    updateItem,
    deleteItem,
    getAllItems,
    getItemById,
    getItemByName
} = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const items = await getAllItems();
        res.send(items);
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.post("/", async (req, res, next) => {
    const { name } = req.body;
    try {
        if (await getItemByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot add item ${name}, ${name} already exists!`
            });
        } else {
            const item = await createItem(req.body);
            res.send(item);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.patch("/:itemId", async (req, res, next) => {
    const { itemId } = req.params;
    const { name } = req.body;
    try {
        const item = await getItemById(itemId);
        if (item.name !== name && await getItemByName(name)) {
            res.send({
                name: "NameTakenError",
                message: `Cannot change item name to ${name}, ${name} already exists!`
            });
        } else {
            const updatedItem = await updateItem(itemId, req.body);
            res.send(updatedItem);
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

router.delete("/:itemId", async (req, res, next) => {
    const { itemId } = req.params;
    try {
        const item = await getItemById(itemId);
        if (item) {
            const deletedItem = await deleteItem(itemId);
            res.send(deletedItem);
        }
    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = router;