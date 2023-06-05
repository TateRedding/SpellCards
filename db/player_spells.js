const client = require("./client");
const { deleteRow } = require("./utils");

const createPlayerSpell = async (playerId, spellId) => {
    try {
        const { rows: [playerSpell] } = await client.query(`
            INSERT INTO player_spells ("playerId", "spellId")
            VALUES (${playerId}, ${spellId})
            RETURNING *;
        `);
        return playerSpell;
    } catch (error) {
        console.error(error);
    };
};

const deletePlayerSpell = async (id) => {
    try {
        return await deleteRow('player_spells', id);
    } catch (error) {
        console.error(error);
    };
};

const deletePlayerSpellsBySpellId = async (spellId) => {
    try {
        const { rows: playerSpells } = await client.query(`
            DELETE FROM player_spells
            WHERE "spellId"=${spellId}
            RETURNING *;
        `);
        return playerSpells;
    } catch (error) {
        console.error(error);
    };
};

const getPlayerSpellByPlayerIdAndSpellId = async (playerId, spellId) => {
    try {
        const { rows: [playerSpell] } = await client.query(`
        SELECT *
        FROM player_spells
        WHERE "playerId"=${playerId}
        AND "spellId"=${spellId};
    `);
    return playerSpell;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayerSpell,
    deletePlayerSpell,
    deletePlayerSpellsBySpellId,
    getPlayerSpellByPlayerIdAndSpellId
};