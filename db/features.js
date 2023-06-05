const client = require("./client");
const {
    createRow,
    updateRow,
    deleteRow,
    getAllRows,
    getRowById,
    getRowByName
} = require("./utils");

const createFeature = async (fields) => {
    try {
        return await createRow('features', fields);
    } catch (error) {
        console.error(error);
    };
};

const updateFeature = async (id, fields) => {
    try {
        return await updateRow('features', id, fields);
    } catch (error) {
        console.error(error);
    };
};

const deleteFeature = async (id) => {
    try {
        return await deleteRow('features', id)
    } catch (error) {
        console.error(error);
    };
};

const getAllFeatures = async () => {
    try {
        return getAllRows('features');
    } catch (error) {
        console.error(error);
    };
};

const getFeatureById = async (id) => {
    try {
        return await getRowById('features', id)
    } catch (error) {
        console.error(error);
    };
};

const getFeatureByName = async (name) => {
    try {
        return await getRowByName('features', name);
    } catch (error) {
        console.error(error);
    };
};

const getFeaturesByPlayerId = async (playerId) => {
    try {
        const { rows: spells } = await client.query(`
            SELECT features.*, player_features.id as "playerFeatureId"
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