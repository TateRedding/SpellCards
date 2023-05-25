const client = require("./client");
const {
    createPlayer,
    createSpell,
    createPlayerSpell,
    createFeature,
    createPlayerFeature
} = require(".");

const dropTables = async () => {
    try {
        console.log("Dropping tables...");
        await client.query(`
            DROP TABLE IF EXISTS player_spells;
            DROP TABLE IF EXISTS player_features;
            DROP TABLE IF EXISTS spells;
            DROP TABLE IF EXISTS features;
            DROP TABLE IF EXISTS players;
        `);
        console.log("Finished dropping tables.");
    } catch (error) {
        console.log("Error dropping tables!");
        console.error(error);
    };
};

const createTables = async () => {
    try {
        console.log("Creating tables...");
        await client.query(`
            CREATE TABLE IF NOT EXISTS players (
                id SERIAL PRIMARY KEY,
                name VARCHAR(32) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS spells (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                level INTEGER NOT NULL,
                school VARCHAR(32) NOT NULL,
                "castingTime" TEXT,
                range TEXT,
                verbal BOOLEAN DEFAULT false,
                somatic BOOLEAN DEFAULT false,
                material BOOLEAN DEFAULT false,
                "materialComponents" TEXT,
                concentration BOOLEAN DEFAULT false,
                duration TEXT,
                description TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS player_spells (
                id SERIAL PRIMARY KEY,
                "playerId" INTEGER NOT NULL REFERENCES players(id),
                "spellId" INTEGER NOT NULL REFERENCES spells(id),
                UNIQUE ("playerId", "spellId")
            );

            CREATE TABLE IF NOT EXISTS features (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                origin VARCHAR(128),
                description TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS player_features (
                id SERIAL PRIMARY KEY,
                "playerId" INTEGER NOT NULL REFERENCES players(id),
                "featureId" INTEGER NOT NULL REFERENCES features(id),
                UNIQUE ("playerId", "featureId")
            );

        `)
        console.log("Finished creating tables!");
    } catch (error) {
        console.log("Error creating tables!");
        console.error(error);
    };
};

const createPlayers = async () => {
    try {
        console.log("Filling players table...");

        const players = [];
        players.push(await createPlayer("Khirun"));
        players.push(await createPlayer("Mona"));
        players.push(await createPlayer("Robi"));
        players.push(await createPlayer("Thrall"));
        players.push(await createPlayer("Torment"));

        console.log(players);
        console.log("Finished filling players table!");
    } catch (error) {
        console.log("Error filling players table!");
        console.log(error);
    };
};

const createInitialSpells = async () => {
    try {
        console.log("Creating initial spells...");

        const spells = [];
        spells.push(await createSpell({
            name: "Hellish Rebuke",
            level: 1,
            school: "Evocation",
            castingTime: "1 reaction which you take in response to being damaged by a creature within 60 feet of you that you can see",
            range: "60 feet",
            verbal: true,
            somatic: true,
            duration: "Instantaneous",
            description: "You point your finger, and the creature that damaged you..."
        }));

        spells.push(await createSpell({
            name: "Phantasmal Force",
            level: 2,
            school: "Illusion",
            castingTime: "1 action",
            range: "60 feet",
            verbal: true,
            somatic: true,
            material: true,
            materialComponents: "a bit of fleece",
            concentration: true,
            duration: "1 minute",
            description: "You craft an illusion that takes root in the mind of a creature you can see within range..."
        }));

        spells.push(await createSpell({
            name: "Sunbeam",
            level: 6,
            school: "Evocation",
            castingTime: "1 action",
            range: "Self, (60-foot line)",
            verbal: true,
            somatic: true,
            material: true,
            materialComponents: "a magnifying glass",
            concentration: true,
            duration: "1 minute",
            description: "A beam of brilliant light flashes out from your hand..."
        }));
        console.log(spells);

        console.log("Finished creating initial spells!");
    } catch (error) {
        console.log("Error creating initial spells!");
        console.error(error);
    };
};

const createInitialPlayerSpells = async () => {
    try {
        console.log("Creating initial player_spells...");

        const playerSpells = [];
        playerSpells.push(await createPlayerSpell(1, 1));
        playerSpells.push(await createPlayerSpell(1, 2));
        playerSpells.push(await createPlayerSpell(1, 3));
        playerSpells.push(await createPlayerSpell(2, 1));
        playerSpells.push(await createPlayerSpell(3, 1));
        playerSpells.push(await createPlayerSpell(3, 3));
        playerSpells.push(await createPlayerSpell(4, 2));
        playerSpells.push(await createPlayerSpell(4, 3));
        playerSpells.push(await createPlayerSpell(5, 2));
        console.log(playerSpells);

        console.log("Finished creating initial player_spells!");
    } catch (error) {
        console.log("Error creating initial player_spells!");
        console.error(error);
    };
};

const createInitialFeatures = async () => {
    try {
        console.log("Creating initial features...");

        const features = [];
        features.push(await createFeature({
            name: "Channel Divinity: Turn Undead",
            origin: "Cleric",
            description: "As an action, you present your holy symbol...",
        }));
        features.push(await createFeature({
            name: "Darkvision",
            origin: "Species",
            description: "You have superior vision in dark and dim condictions.",
        }));
        features.push(await createFeature({
            name: "Reckless Attack",
            origin: "Barbarian",
            description: "Starting at 2nd level, you can throw aside all concern for defense...",
        }));
        features.push(await createFeature({
            name: "Lay On Hands",
            origin: "Paladin",
            description: "Your blessed touch can heal wounds.",
        }));
        console.log(features);

        console.log("Finished creating initial features!");
    } catch (error) {
        console.log("Error creating initial features!");
        console.error(error);
    };
};

const createInitialPlayerFeatures = async () => {
    try {
        console.log("Creating initial player_features...");

        const playerFeatures = [];
        playerFeatures.push(await createPlayerFeature(1, 1));
        playerFeatures.push(await createPlayerFeature(1, 2));
        playerFeatures.push(await createPlayerFeature(2, 4));
        playerFeatures.push(await createPlayerFeature(3, 2));
        playerFeatures.push(await createPlayerFeature(4, 3));
        playerFeatures.push(await createPlayerFeature(5, 2));
        console.log(playerFeatures);

        console.log("Finished creating initial player_features!");
    } catch (error) {
        console.log("Error creating initial player_features!");
        console.error(error);
    };
};

const reseedDB = async () => {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createPlayers();
        await createInitialSpells();
        await createInitialPlayerSpells();
        await createInitialFeatures();
        await createInitialPlayerFeatures();
    } catch (error) {
        console.error(error);
    };
};

const initializeDB = async () => {
    try {
        client.connect();
        await createTables();
        await createPlayers();
    } catch (error) {
        console.error(error);
    };
}

module.exports = {
    reseedDB,
    initializeDB
};