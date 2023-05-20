const client = require("./client");

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
        const { rows: [playerSpell] } = await client.query(`
            DELETE FROM player_spells,
            WHERE id=${id}
            RETURNING *;
        `);
        return playerSpell;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayerSpell,
    deletePlayerSpell
};