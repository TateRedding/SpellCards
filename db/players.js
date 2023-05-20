const client = require("./client");

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

const getPlayerById = async (id) => {
    try {
        const { rows: [player] } = await client.query(`
            SELECT *
            FROM players
            WHERE id=${id};
        `);
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
            WHERE name=${name};
        `);
        return player;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayer,
    getPlayerById,
    getPlayerByName
};