const client = require("./client");
const {
    createPlayer
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
            CREATE TABLE players (
                id SERIAL PRIMARY KEY,
                name VARCHAR(32) NOT NULL
            );

            CREATE TABLE spells (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                level INTEGER NOT NULL,
                school VARCHAR(32) NOT NULL,
                "castingTimeInt" INTEGER,
                "castingTimeUnit" VARCHAR(32),
                "rangeInt" INTEGER,
                "ranegUnit" VARCHAR(32),
                verbal BOOLEAN DEFAULT false,
                somatic BOOLEAN DEFAULT false,
                material BOOLEAN DEFAULT false,
                "materialComponents" TEXT,
                concentration BOOLEAN DEFAULT false,
                "durationInt" INTEGER,
                "durationUnit" VARCHAR(32),
                description TEXT NOT NULL
            );

            CREATE TABLE player_spells (
                id SERIAL PRIMARY KEY,
                "playerId" INTEGER NOT NULL REFERENCES players(id),
                "spellId" INTEGER NOT NULL REFERENCES spells(id),
                UNIQUE ("playerId", "spellId")
            );

            CREATE TABLE features (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                species VARCHAR(32),
                class VARCHAR(32),
                level INTEGER,
                description TEXT NOT NULL
            );

            CREATE TABLE player_features (
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
        players.push(await createPlayer("Khirun of the S.C."));
        players.push(await createPlayer("Sir Mona LoneLeaf"));
        players.push(await createPlayer("Robi Xenon Li"));
        players.push(await createPlayer("Thrall Frostskin"));
        players.push(await createPlayer("Torment"));

        console.log(players);
        console.log("Finished filling players table!");
    } catch (error) {
        console.log("Error filling players table!");
        console.log(error);
    };
};

const rebuildDB = async () => {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createPlayers();
    } catch (error) {
        console.error(error);
    };
};

rebuildDB()
    .catch(console.error)
    .finally(() => client.end());