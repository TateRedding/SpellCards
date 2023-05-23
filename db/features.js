const client = require("./client");

const createFeature = async (fields) => {
    const keys = Object.keys(fields);
    const valuesString = keys.map((key, index) => `$${index + 1}`).join(', ');
    const columnNames = keys.map((key) => `"${key}"`).join(', ');
    try {
        const { rows: [result] } = await client.query(`
            INSERT INTO features (${columnNames})
            VALUES (${valuesString})
            RETURNING *;
        `, Object.values(fields));
        return result;
    } catch (error) {
        console.error(error);
    };
};

const updateFeature = async (id, fields) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (!setString.length) {
        return;
    };
    try {
        const { rows: [feature] } = await client.query(`
            UPDATE spells
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return feature;
    } catch (error) {
        console.error(error);
    };
};

const deleteFeature = async (id) => {
    try {
        const { rows: [feature] } = await client.query(`
            DELETE FROM features
            WHERE id=${id}
            RETURNING *;
        `);
        return feature;
    } catch (error) {
        console.error(error);
    };
};

const getAllFeatures = async () => {
    try {
        const { rows: features } = await client.query(`
            SELECT *
            FROM features;
        `);
        return features
    } catch (error) {
        console.error(error);
    };
};

const getFeatureById = async (id) => {
    try {
        const { rows: [feature] } = await client.query(`
            SELECT *
            FROM features
            WHERE id=${id};
        `);
        return feature;
    } catch (error) {
        console.error(error);
    };
};

const getFeatureByName = async (name) => {
    try {
        const { rows: [feature] } = await client.query(`
            SELECT *
            FROM features
            WHERE name='${name}';
        `);
        return feature;
    } catch (error) {
        console.error(error);
    };
};

const getFeaturesByPlayerId = async (playerId) => {
    try {
        const { rows: spells } = await client.query(`
            SELECT features.*
            FROM features
            JOIN player_features
                ON player_features."featureId"=features.id
            WHERE player_features."playerId"=${playerId};
        `);
        return spells;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createFeature,
    updateFeature,
    deleteFeature,
    getAllFeatures,
    getFeatureById,
    getFeatureByName,
    getFeaturesByPlayerId
};