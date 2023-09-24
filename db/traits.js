const client = require("./client");
const {
    createRow,
    updateRow,
    deleteRow,
    getAllRows,
    getRowById,
    getRowByName
} = require("./utils");

const createTrait = async (fields) => {
    try {
        return await createRow('traits', fields);
    } catch (error) {
        console.error(error);
    };
};

const updateTrait = async (id, fields) => {
    try {
        return await updateRow('traits', id, fields);
    } catch (error) {
        console.error(error);
    };
};

const deleteTrait = async (id) => {
    try {
        return await deleteRow('traits', id)
    } catch (error) {
        console.error(error);
    };
};

const getAllTraits = async () => {
    try {
        return getAllRows('traits');
    } catch (error) {
        console.error(error);
    };
};

const getTraitById = async (id) => {
    try {
        return await getRowById('traits', id)
    } catch (error) {
        console.error(error);
    };
};

const getTraitByName = async (name) => {
    try {
        return await getRowByName('traits', name);
    } catch (error) {
        console.error(error);
    };
};

const getTraitsByPlayerId = async (playerId) => {
    try {
        const { rows: spells } = await client.query(`
            SELECT traits.*, player_traits.id as "playerTraitId"
            FROM traits
            JOIN player_traits
                ON player_traits."traitId"=traits.id
            WHERE player_traits."playerId"=${playerId};
        `);
        return spells;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createTrait,
    updateTrait,
    deleteTrait,
    getAllTraits,
    getTraitById,
    getTraitByName,
    getTraitsByPlayerId
};