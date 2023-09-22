const client = require("./client");
const { deleteRow } = require("./utils");

const createPlayerTrait = async (playerId, traitId) => {
    try {
        const { rows: [playerTrait] } = await client.query(`
            INSERT INTO player_traits ("playerId", "traitId")
            VALUES (${playerId}, ${traitId})
            RETURNING *;
        `);
        return playerTrait;
    } catch (error) {
        console.error(error);
    };
};

const deletePlayerTrait = async (id) => {
    try {
        return await deleteRow('player_traits', id);
    } catch (error) {
        console.error(error);
    };
};

const deletePlayerTraitsByTraitId = async (traitId) => {
    try {
        const { rows: playerTraits } = await client.query(`
            DELETE FROM player_traits
            WHERE "traitId"=${traitId}
            RETURNING *;
        `);
        return playerTraits;
    } catch (error) {
        console.error(error);
    };
};

const getPlayerTraitByPlayerIdAndTraitId = async (playerId, traitId) => {
    try {
        const { rows: [playerTrait] } = await client.query(`
            SELECT *
            FROM player_traits
            WHERE "playerId"=${playerId}
            AND "traitId"=${traitId};
        `);
    return playerTrait;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayerTrait,
    deletePlayerTrait,
    deletePlayerTraitsByTraitId,
    getPlayerTraitByPlayerIdAndTraitId
};