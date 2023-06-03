const {
    createRow,
    updateRow,
    deleteRow,
    getAllRows
} = require("./utils");

const createQuest = async (fields) => {
    try {
        return await createRow('quests', fields);
    } catch (error) {
        console.error(error);
    };
};

const updateQuest = async (id, fields) => {
    try {
        return await updateRow('quests', id, fields);
    } catch (error) {
        console.error(error);
    };
};

const deleteQuest = async (id) => {
    try {
        return await deleteRow('quests', id);
    } catch (error) {
        console.error(error);
    };
};

const getAllQuests = async () => {
    try {
        return await getAllRows('quests');
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createQuest,
    updateQuest,
    deleteQuest,
    getAllQuests
};