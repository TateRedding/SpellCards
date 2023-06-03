const client = require("./client");
const {
    createRow,
    updateRow,
    deleteRow,
    getAllRows
} = require("./utils")

const createItem = async (fields) => {
    try {
        return await createRow('items', fields);
    } catch (error) {
        console.error(error);
    };
};

const updateItem = async (id, fields) => {
    try {
        return await updateRow('items', id, fields);
    } catch (error) {
        console.error(error);
    };
};

const deleteItem = async (id) => {
    try {
        return await deleteRow('items', id);
    } catch (error) {
        console.error(error);
    };
};

const getAllItems = async () => {
    try {
        return await getAllRows('items');
    } catch (error) {
        console.error(error);
    };

};

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getAllItems
};