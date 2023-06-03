const client = require("./client");
const {
    createRow,
    updateRow,
    deleteRow,
    getAllRows,
    getRowById,
    getRowByName
} = require("./utils");

const createSpell = async (fields) => {
    try {
        return await createRow('spells', fields)
    } catch (error) {
        console.error(error);
    };
};

const updateSpell = async (id, fields) => {
    try {
        return await updateRow('spells', id, fields);
    } catch (error) {
        console.error(error);
    };
};

const deleteSpell = async (id) => {
    try {
        return await deleteRow('spells', id);
    } catch (error) {
        console.error(error);
    };
};

const getAllSpells = async () => {
    try {
        return getAllRows('spells');
    } catch (error) {
        console.error(error);
    };
};

const getSpellById = async (id) => {
    try {
        return await getRowById('spells', id);
    } catch (error) {
        console.error(error);
    };
};

const getSpellByName = async (name) => {
    try {
        return await getRowByName('spells', name);
    } catch (error) {
        console.error(error);
    };
};

const getSpellsByPlayerId = async (playerId) => {
    try {
        const { rows: spells } = await client.query(`
            SELECT spells.*, player_spells.id as "playerSpellId"
            FROM spells
            JOIN player_spells
                ON player_spells."spellId"=spells.id
            WHERE player_spells."playerId"=${playerId};
        `);
        return spells;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createSpell,
    updateSpell,
    deleteSpell,
    getAllSpells,
    getSpellById,
    getSpellByName,
    getSpellsByPlayerId
};