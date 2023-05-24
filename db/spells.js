const client = require("./client");

const createSpell = async (fields) => {
    const keys = Object.keys(fields);
    const valuesString = keys.map((key, index) => `$${index + 1}`).join(', ');
    const columnNames = keys.map((key) => `"${key}"`).join(', ');
    try {
        const { rows: [result] } = await client.query(`
            INSERT INTO spells (${columnNames})
            VALUES (${valuesString})
            RETURNING *;
        `, Object.values(fields));
        return result;
    } catch (error) {
        console.error(error);
    };
};

const updateSpell = async (id, fields) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (!setString.length) {
        return;
    };
    try {
        const { rows: [spell] } = await client.query(`
            UPDATE spells
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return spell;
    } catch (error) {
        console.error(error);
    };
};

const deleteSpell = async (id) => {
    try {
        const { rows: [spell] } = await client.query(`
            DELETE FROM spells
            WHERE id=${id}
            RETURNING *;
        `);
        return spell;
    } catch (error) {
        console.error(error);
    };
};

const getAllSpells = async () => {
    try {
        const { rows: spells } = await client.query(`
            SELECT *
            FROM spells;
        `);
        return spells;
    } catch (error) {
        console.error(error);
    };
};

const getSpellById = async (id) => {
    try {
        const { rows: [spell] } = await client.query(`
            SELECT *
            FROM spells
            WHERE id=${id}
        `);
        return spell;
    } catch (error) {
        console.error(error);
    };
};

const getSpellByName = async (name) => {
    try {
        const { rows: [spell] } = await client.query(`
            SELECT *
            FROM spells
            WHERE name='${name}'
        `);
        return spell;
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