const client = require("./client");

const createPlayer = async (name) => {
    try {
    const { rows: [player] } = await client.query(`
        INSERT INTO players(name)
        VALUES ('${name}')
        RETURNING *;
    `);
    return player;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayer
};