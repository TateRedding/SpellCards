const { Client } = require("pg");
require("dotenv").config();
const axios = require("axios");
// DO NOT UNCOMMENT THE NEXT LINE UNTIL READY FOR PRODUCTION
// const spellCardsURL = process.env.EXTERNAL_DATABASE_URL;
const spellCardsURL = "postgres://localhost:5432/spell-cards-dev";
const client = new Client(spellCardsURL);
const API_URL = "https://www.dnd5eapi.co"

const updateTables = async () => {
    try {
        await client.query(`
            ALTER TABLE players
            RENAME COLUMN "shortName" to "urlName";

            ALTER TABLE spells
            ADD COLUMN IF NOT EXISTS classes VARCHAR(32)[];

            ALTER TABLE features
            DROP COLUMN IF EXISTS origin,
            ADD COLUMN IF NOT EXISTS class VARCHAR(32),
            ADD COLUMN IF NOT EXISTS subclass VARCHAR(32);

            CREATE TABLE IF NOT EXISTS traits (
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                species VARCHAR(32)[],
                subspecies VARCHAR(32)[],
                description TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS player_traits (
                id SERIAL PRIMARY KEY,
                "playerId" INTEGER NOT NULL REFERENCES players(id),
                "traitId" INTEGER NOT NULL REFERENCES traits(id),
                UNIQUE ("playerId", "traitId")
            );
        `);
    } catch (error) {
        console.error(error);
    };
};

const updateSpellList = async () => {
    try {
        const { data: { results: spells } } = await axios.get(`${API_URL}/api/spells`);
        for (const spell of spells) {
            const { data: spellData } = await axios.get(`${API_URL}${spell.url}`);
            const { rows: [existingSpell] } = await client.query(`
                SELECT *
                FROM spells
                WHERE name='${spell.name.split("'").join("''")}';
            `);
            if (existingSpell) {
                const classesArrayString = `{${spellData.classes.map(cls => cls.name).join((','))}}`;
                await client.query(`
                    UPDATE spells
                    SET classes=$1
                    WHERE name=$2
                    RETURNING *;
                `, [classesArrayString, spell.name]);
            } else {
                const newData = translateSpellData(spellData);
                const keys = Object.keys(newData);
                const valuesString = keys.map((key, index) => `$${index + 1}`).join(', ');
                const columnNames = keys.map((key) => `"${key}"`).join(', ');
                await client.query(`
                    INSERT INTO spells (${columnNames})
                    VALUES (${valuesString});
                `, Object.values(newData));
            };
        };
    } catch (error) {
        console.error(error);
    };
};

const updateFeatureList = async () => {
    try {
        const { data: { results: features } } = await axios.get(`${API_URL}/api/features`);
        const skipList = [
            "Ability Score Improvement",
            "Extra Attack (2)",
            "Extra Attack (3)"
        ];
        const addClassName = [
            "Extra Attack",
            "Fighting Style",
            "Unarmored Defense"
        ];
        const similarlyNamedFeatures = [
            "Action Surge",
            "Bardic Inspiration",
            "Brutal Critical",
            "Circle of the Land",
            "Destroy Undead",
            "Divine Intervention",
            "Dragon Ancestor",
            "Favored Enemy",
            "Indomitable",
            "Mystic Arcanum",
            "Natural Explorer",
            "Song of Rest",
            "Wild Shape"
        ];
        const completedFeatures = [];
        for (const feature of features) {
            if (skipList.includes(feature.name)) continue;
            let featureName = feature.name;
            for (const name of similarlyNamedFeatures) {
                if (featureName.startsWith(name)) {
                    featureName = name;
                    if (completedFeatures.includes(featureName)) {
                        continue;
                    };
                    break;
                };
            };
            if (featureName === "Channel Divinity") featureName = "Channel Divinity: Paladin";
            if (featureName.startsWith("Channel Divinity (")) featureName = "Channel Divinity: Cleric";
            const { data: featureData } = await axios.get(`${API_URL}${feature.url}`);
            if (addClassName.includes(featureName)) featureName = `${featureName}: ${featureData.class.name}`
            if (completedFeatures.includes(featureName)) continue;
            const { rows: [existingFeature] } = await client.query(`
                SELECT *
                FROM features
                WHERE name='${featureName.split("'").join("''")}';
            `);
            if (existingFeature) {
                let values = [featureData.class.name];
                let query = "UPDATE features SET class=$1";
                if (featureData.subclass) {
                    query += ", subclass=$2 WHERE name=$3;";
                    values.push(featureData.subclass.name);
                } else {
                    query += " WHERE name=$2;";
                };
                values.push(featureName);
                await client.query(query, values);
            } else {
                const newData = translateFeatureData(featureName, featureData);
                const keys = Object.keys(newData);
                const valuesString = keys.map((key, index) => `$${index + 1}`).join(', ');
                const columnNames = keys.map((key) => `"${key}"`).join(', ');
                await client.query(`
                    INSERT INTO features (${columnNames})
                    VALUES (${valuesString});
                `, Object.values(newData));
            };
            completedFeatures.push(featureName);
        };
    } catch (error) {
        console.error(error);
    };
};

const addTraitsToTraitsList = async () => {
    try {
        const { data: { results: traits } } = await axios.get(`${API_URL}/api/traits`);
        const completedTraits = [];
        for (const trait of traits) {
            let traitName = trait.name;
            if (traitName.startsWith("Draconic Ancestry")) traitName = "Draconic Ancestry";
            if (completedTraits.includes(traitName)) continue;
            const { data: traitData } = await axios.get(`${API_URL}${trait.url}`);
            const { rows: [existingFeature] } = await client.query(`
                SELECT *
                FROM traits
                WHERE name='${traitName.split("'").join("''")}';
            `);
            if (existingFeature) {
                const speciesArrayString = `{${traitData.races.map(species => species.name).join((','))}}`;
                const subspeciesArrayString = `{${traitData.subraces.map(subspecies => subspecies.name).join((','))}}`;
                await client.query(`
                    UPDATE traits
                    SET 
                        species=$1,
                        subspecies=$2
                    WHERE name=$3
                    RETURNING *;
                `, [speciesArrayString, subspeciesArrayString, traitName]);
            } else {
                const newData = translateTraitData(traitData);
                const keys = Object.keys(newData);
                const valuesString = keys.map((key, index) => `$${index + 1}`).join(', ');
                const columnNames = keys.map((key) => `"${key}"`).join(', ');
                await client.query(`
                    INSERT INTO traits (${columnNames})
                    VALUES (${valuesString});
                `, Object.values(newData));
            };
            completedTraits.push(traitName);
        };
    } catch (error) {
        console.error(error);
    };
}

const translateSpellData = (spellData) => {
    let description = spellData.desc.join("\n");
    if (spellData.higher_level.length) description += spellData.higher_level.join("\n**At Higher Levels:**");
    const newSpellData = {
        name: spellData.name,
        level: spellData.level,
        school: spellData.school.name,
        castingTime: spellData.casting_time,
        range: spellData.range,
        verbal: spellData.components.includes('V'),
        somatic: spellData.components.includes('S'),
        material: spellData.components.includes('M'),
        concentration: spellData.concentration,
        duration: spellData.duration,
        description,
        classes: spellData.classes.map(cls => cls.name),
    };
    if (spellData.material) newSpellData.materialComponents = spellData.material;
    return newSpellData;
};

const translateFeatureData = (featureName, featureData) => {
    const description = featureData.desc.join("\n");
    const newFeatureData = {
        name: featureName,
        class: featureData.class.name,
        description
    };
    if (featureData.subclass) newFeatureData.subclass = featureData.subclass.name;
    return newFeatureData;
};

const translateTraitData = (traitData) => {
    const description = traitData.desc.join("\n");
    const newTraitData = {
        name: traitData.name,
        description,
        species: traitData.races.map(species => species.name),
        subspecies: traitData.subraces.map(subspecies => subspecies.name)
    };
    return newTraitData;
};

const updateDatabase = async () => {
    try {
        client.connect();
        await updateTables();
        await updateSpellList();
        await updateFeatureList();
        await addTraitsToTraitsList();
    } catch (error) {
        console.error(error);
    };
};

updateDatabase()
    .catch(console.error)
    .finally(() => client.end());