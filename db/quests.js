const {
    createRow,
    updateRow,
    deleteRow,
    getAllRows,
    getRowById,
    getRowByName
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

const getQuestById = async (id) => {
    try {
        return await getRowById('quests', id)
    } catch (error) {
        console.error(error);
    };
};

const getQuestByName = async (name) => {
    try {
        return await getRowByName('quests', name)
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createQuest,
    updateQuest,
    deleteQuest,
    getAllQuests,
    getQuestById,
    getQuestByName
};