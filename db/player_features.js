const client = require("./client");

const createPlayerFeature = async (playerId, featureId) => {
    try {
        const { rows: [playerFeature] } = await client.query(`
            INSERT INTO player_features ("playerId", "featureId")
            VALUES (${playerId}, ${featureId})
            RETURNING *;
        `);
        return playerFeature;
    } catch (error) {
        console.error(error);
    };
};

const deletePlayerFeature = async (id) => {
    try {
        const { rows: [playerFeature] } = await client.query(`
            DELETE FROM player_features
            WHERE id=${id}
            RETURNING *;
        `);
        return playerFeature;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayerFeature,
    deletePlayerFeature
};