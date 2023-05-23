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

const deletePlayerFeaturesByFeatureId = async (featureId) => {
    try {
        const { rows: playerFeatures } = await client.query(`
            DELETE FROM player_features
            WHERE "featureId"=${featureId}
            RETURNING *;
        `);
        return playerFeatures;
    } catch (error) {
        console.error(error);
    };
};

const getPlayerFeatureByPlayerIdAndFeatureId = async (playerId, featureId) => {
    try {
        const { rows: [playerFeature] } = await client.query(`
            SELECT *
            FROM player_features
            WHERE "playerId"=${playerId}
            AND "featureId"=${featureId};
        `);
    return playerFeature;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createPlayerFeature,
    deletePlayerFeature,
    deletePlayerFeaturesByFeatureId,
    getPlayerFeatureByPlayerIdAndFeatureId
};