const client = require("./client");
const {
    createPlayer,
    createSpell,
    createPlayerSpell,
    createFeature,
    createPlayerFeature,
    createItem,
    createQuest,
    createTrait,
    createPlayerTrait
} = require(".");

const dropTables = async () => {
    try {
        console.log("Dropping tables...");
        await client.query(`
            DROP TABLE IF EXISTS player_traits;
            DROP TABLE IF EXISTS player_spells;
            DROP TABLE IF EXISTS player_features;
            DROP TABLE IF EXISTS traits;
            DROP TABLE IF EXISTS spells;
            DROP TABLE IF EXISTS features;
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS quests;
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
                name VARCHAR(32) UNIQUE NOT NULL,
                "urlName" VARCHAR(32),
                pin INTEGER UNIQUE,
                "isAdmin" BOOLEAN DEFAULT FALSE
            );

            CREATE TABLE spells (
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
                description TEXT NOT NULL,
                classes VARCHAR(32)[]
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
                description TEXT NOT NULL,
                class VARCHAR(32),
                subclass VARCHAR(32)
            );

            CREATE TABLE player_features (
                id SERIAL PRIMARY KEY,
                "playerId" INTEGER NOT NULL REFERENCES players(id),
                "featureId" INTEGER NOT NULL REFERENCES features(id),
                UNIQUE ("playerId", "featureId")
            );

            CREATE TABLE traits (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                species VARCHAR(32)[],
                subspecies VARCHAR(32)[],
                description TEXT NOT NULL
            );

            CREATE TABLE player_traits (
                id SERIAL PRIMARY KEY,
                "playerId" INTEGER NOT NULL REFERENCES players(id),
                "traitId" INTEGER NOT NULL REFERENCES traits(id),
                UNIQUE ("playerId", "traitId")
            );

            CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                category VARCHAR(32) NOT NULL,
                "categoryDetails" VARCHAR(128),
                rarity VARCHAR(32) NOT NULL,
                "requiresAttunement" BOOLEAN DEFAULT false,
                "attunementRequirements" TEXT,
                description TEXT NOT NULL
            );

            CREATE TABLE quests (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                giver VARCHAR(128) NOT NULL,
                completed BOOLEAN DEFAULT false,
                description TEXT NOT NULL
            );

        `);
        console.log("Finished creating tables!");
    } catch (error) {
        console.log("Error creating tables!");
        console.error(error);
    };
};

const createPlayers = async () => {
    try {
        console.log("Filling players table...");

        await createPlayer({
            name: 'Khirun of the S.C.',
            urlName: 'Khirun',
            pin: 5716,
            isAdmin: false
        });
        await createPlayer({
            name: 'Sir Mona Loneleaf',
            urlName: 'Mona',
            pin: 5759,
            isAdmin: false
        });
        await createPlayer({
            name: 'Robi Xenon Li',
            urlName: 'Robi',
            pin: 8588,
            isAdmin: false
        });
        await createPlayer({
            name: 'Thrall Frostskin',
            urlName: 'Thrall',
            pin: 2706,
            isAdmin: false
        });
        await createPlayer({
            name: 'Torment',
            urlName: 'Torment',
            pin: 9472,
            isAdmin: false
        });
        await createPlayer({
            name: 'Tate',
            urlName: 'Tate',
            pin: 1994,
            isAdmin: true
        });

        const { rows: players } = await client.query(`
            SELECT *
            FROM players;
        `);
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
            description: "You point your finger, and the creature that damaged you...",
            classes: ["Warlock"]
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
            description: "You craft an illusion that takes root in the mind of a creature you can see within range...",
            classes: ["Bard", "Sorcerer", "Wizard"]
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
            description: "A beam of brilliant light flashes out from your hand...",
            classes: ["Druid", "Sorcerer", "Wizard"]
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
            class: "Cleric",
            description: "As an action, you present your holy symbol...",
        }));
        features.push(await createFeature({
            name: "Lay On Hands",
            class: "Paladin",
            description: "Your blessed touch can heal wounds.",
        }));
        features.push(await createFeature({
            name: "Hunter's Prey: Colossus Slayer",
            class: "Ranger",
            subclass: "Hunter",
            description: "Your tenacity can wear down the most potent foes.",
        }));

        features.push(await createFeature({
            name: "Reckless Attack",
            class: "Barbarian",
            description: "Starting at 2nd level, you can throw aside all concern for defense...",
        }));
        features.push(await createFeature({
            name: "Wild Shape",
            class: "Druid",
            description: "Starting at 2nd level, you can use your action to magically assume the shape of a beast",
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
        playerFeatures.push(await createPlayerFeature(2, 2));
        playerFeatures.push(await createPlayerFeature(3, 3));
        playerFeatures.push(await createPlayerFeature(4, 4));
        playerFeatures.push(await createPlayerFeature(5, 5));
        console.log(playerFeatures);

        console.log("Finished creating initial player_features!");
    } catch (error) {
        console.log("Error creating initial player_features!");
        console.error(error);
    };
};

const createInitialTraits = async () => {
    try {
        console.log("Creating initial traits...");

        const traits = [];
        traits.push(await createTrait({
            name: "Darkvision",
            species: ["Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"],
            description: "You have superior vision in dark and dim conditions."
        }));
        traits.push(await createTrait({
            name: "Unending Breath",
            subspecies: ["Air Genasi"],
            description: "You can hold your breath indefinitely while you’re not incapacitated."
        }));
        traits.push(await createTrait({
            name: "Severed From Dreams",
            species: ["Kalashtar"],
            description: "Kalashtar sleep, but they don’t connect to the plane of dreams as other creatures do."
        }));
        console.log(traits);

        console.log("Finished creating initial traits!");
    } catch (error) {
        console.log("Error creating initial traits!");
        console.error(error);
    };
};

const createInitialPlayerTraits = async () => {
    try {
        console.log("Creating initial player_traits...");

        const playerTraits = [];
        playerTraits.push(await createPlayerTrait(3, 1));
        playerTraits.push(await createPlayerTrait(4, 1));
        playerTraits.push(await createPlayerTrait(5, 1));
        playerTraits.push(await createPlayerTrait(3, 2));
        playerTraits.push(await createPlayerTrait(1, 3));

        console.log("Finished creating initial player_traits!");
    } catch (error) {
        console.log("Error creating initial player_traits!");
        console.error(error);
    };
};

const createInitialItems = async () => {
    try {
        console.log("Creating initial items...");

        const items = [];
        items.push(await createItem({
            name: "Manual of Gainful Exercise",
            category: "Wonderous Item",
            rarity: "Very rare",
            description: "This book describes fitness exercises, and it's words are charged with magic."
        }));
        items.push(await createItem({
            name: "Mace of Terror",
            category: "Weapon",
            categoryDetails: "mace",
            rarity: "Rare",
            requiresAttunement: true,
            description: "This magic weapon has 3 charges. While holding it..."
        }));
        items.push(await createItem({
            name: "Instrument of the Bards: Cli Lyre",
            category: "Wonderous Item",
            rarity: "Rare",
            requiresAttunement: true,
            attunementRequirements: "a bard",
            description: "An instrument of the bards is an exquisite example of it's kind..."
        }));
        console.log(items);

    } catch (error) {
        console.log("Error creating initial items!");
        console.error(error);
    };
};

const createInitialQuests = async () => {
    try {
        console.log("Creating initial quests...");

        const quests = [];
        quests.push(await createQuest({
            name: "Kill the rat infestation",
            giver: "Abismark",
            completed: true,
            description: "Abismark in Valakovia has asked you to..."
        }));
        quests.push(await createQuest({
            name: "Escort Bart to Berton",
            giver: "Bart",
            description: "Bart is scraed of traveling alone and..."

        }));
        quests.push(await createQuest({
            name: "Find the stolen books",
            giver: "Librarian in Valakovia",
            description: "The library of Valakovia has been robbed of some very important books..."

        }));
        console.log(quests);

    } catch (error) {
        console.log("Error creating initial quests!");
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
        await createInitialTraits();
        await createInitialPlayerTraits();
        await createInitialItems();
        await createInitialQuests();
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    reseedDB
};