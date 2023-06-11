const { getSpellsByPlayerId } = require("./spells");
const { getFeaturesByPlayerId } = require("./features");
const {
    createRow,
    getAllRows,
    getRowById,
    getRowByName
} = require("./utils");

const createPlayer = async (fields) => {
    try {
        return await createRow('players', fields);
    } catch (error) {
        console.error(error);
    };
};

const getAllPlayers = async () => {
    try {
        return getAllRows('players');
    } catch (error) {
        console.error(error);
    };
};

const getPlayerById = async (id) => {
    try {
        const player = await getRowById('players', id);
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
        return await getRowByName('players', name);
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