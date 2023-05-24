const client = require("./client");
const { getSpellsByPlayerId } = require("./spells");
const { getFeaturesByPlayerId } = require("./features");

const createPlayer = async (name) => {
    try {
        const { rows: [player] } = await client.query(`
            INSERT INTO players (name)
            VALUES ('${name}')
            RETURNING *;
        `);
        return player;
    } catch (error) {
        console.error(error);
    };
};

const getAllPlayers = async () => {
    try {
        const { rows: players } = await client.query(`
            SELECT *
            FROM players;
        `);
        return players;
    } catch (error) {
        console.error(error);
    };
};

const getPlayerById = async (id) => {
    try {
        const { rows: [player] } = await client.query(`
            SELECT *
            FROM players
            WHERE id=${id};
        `);
        if (player) {
            player.spells = await getSpellsByPlayerId(player.id);
            player.features = await getFeaturesByPlayerId(player.id)
        };
        return player;
    } catch (error) {
        console.error(error);
    };
};

const getPlayerByName = async (name) => {
    try {
        const { rows: [player] } = await client.query(`
            SELECT *
            FROM players
            WHERE name='${name}';
        `);
        return player;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    getPlayerByName
};