const { Client } = require("pg");
const axios = require("axios");
// DO NOT UNCOMMENT THE NEXT LINE UNTIL READY FOR PRODUCTION
// const spellCardsURL = process.env.EXTERNAL_DATABASE_URL;
const spellCardsURL = "postgres://localhost:5432/spell-cards-dev";
const client = new Client(spellCardsURL);

const apiURL = "https://www.dnd5eapi.co"

const updateTables = async () => {
    try {
        await client.query(`
            ALTER TABLE spells
            ADD COLUMN IF NOT EXISTS classes VARCHAR(32)[],
            ADD COLUMN IF NOT EXISTS subclasses VARCHAR(32)[];

            ALTER TABLE features
            DROP COLUMN IF EXISTS origin,
            ADD COLUMN IF NOT EXISTS class VARCHAR(32),
            ADD COLUMN IF NOT EXISTS subclass VARCHAR(32),
            ADD COLUMN IF NOT EXISTS species VARCHAR(32)[],
            ADD COLUMN IF NOT EXISTS subspecies VARCHAR(32)[];
        `);
    } catch (error) {
        console.error(error);
    };
};

const updateSpellList = async () => {
    try {
        const { data: { results: spells } } = await axios.get(`${apiURL}/api/spells`);
        for (const spell of spells) {
            const { data: spellData } = await axios.get(`${apiURL}${spell.url}`);
            const spellName = spell.name.split("'").join("''");
            const { rows: [existingSpell] } = await client.query(`
                SELECT *
                FROM spells
                WHERE name='${spellName}';
            `);
            if (existingSpell) {
                const classesArrayString = `{${spellData.classes.map(cls => cls.name).join((','))}}`;
                const subclassesArrayString = `{${spellData.subclasses.map(subcls => subcls.name).join((','))}}`;
                await client.query(`
                    UPDATE spells
                    SET 
                        classes=$1,
                        subclasses=$2
                    WHERE name=$3
                    RETURNING *;
                `, [classesArrayString, subclassesArrayString, spell.name]);
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
        const { data: { results: features } } = await axios.get(`${apiURL}/api/features`);
        const skipList = [
            "Ability Score Improvement",
            "Extra Attack (2)",
            "Extra Attack (3)"
        ];
        const addClassName = [
            "Extra Attack",
            "Unarmored Defense",
            "Fighting Style"
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
        const usedSimilarlyNamedFeatures = [];
        for (const feature of features) {
            if (skipList.includes(feature.name)) continue;
            let featureName = feature.name;
            for (const name of similarlyNamedFeatures) {
                if (featureName.startsWith(name)) {
                    featureName = name;
                    if (usedSimilarlyNamedFeatures.includes(featureName)) {
                        continue;
                    } else {
                        usedSimilarlyNamedFeatures.push(featureName);
                    };
                    break;
                };
            };
            if (featureName === "Channel Divinity") featureName = "Channel Divinity: Paladin";
            if (featureName.startsWith("Channel Divinity (")) featureName = "Channel Divinity: Cleric";
            featureName = featureName.split("'").join("''");
            const { data: featureData } = await axios.get(`${apiURL}${feature.url}`);
            if (addClassName.includes(featureName)) featureName = `${featureName}: ${featureData.class.name}`
            const { rows: [existingFeature] } = await client.query(`
                SELECT *
                FROM features
                WHERE name='${featureName}';
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
        };
    } catch (error) {
        console.error(error);
    };
};

const addTraitsToFeaturesList = async () => {
    try {
        const { data: { results: traits } } = await axios.get(`${apiURL}/api/traits`);
        for (const trait of traits) {
            const { data: traitData } = await axios.get(`${apiURL}${trait.url}`);
            let traitName = trait.name.split("'").join("''");
            if (traitName.startsWith("Draconic Ancestry")) traitName = "Draconic Ancestry";
            const { rows: [existingFeature] } = await client.query(`
                SELECT *
                FROM features
                WHERE name='${traitName}';
            `);
            if (existingFeature) {
                const speciesArrayString = `{${traitData.races.map(species => species.name).join((','))}}`;
                const subspeciesArrayString = `{${traitData.subraces.map(subspecies => subspecies.name).join((','))}}`;
                await client.query(`
                    UPDATE features
                    SET 
                        species=$1,
                        subspecies=$2
                    WHERE name=$3
                    RETURNING *;
                `, [speciesArrayString, subspeciesArrayString, trait.name]);
            } else {
                const newData = translateTraitData(traitData);
                const keys = Object.keys(newData);
                const valuesString = keys.map((key, index) => `$${index + 1}`).join(', ');
                const columnNames = keys.map((key) => `"${key}"`).join(', ');
                await client.query(`
                    INSERT INTO features (${columnNames})
                    VALUES (${valuesString});
                `, Object.values(newData));
            };
        };
    } catch (error) {
        console.error(error);
    };
}

const translateSpellData = (spellData) => {
    let description = "";
    spellData.desc.map((par, idx) => {
        description += par;
        if (idx + 1 !== spellData.desc.length) {
            description += "\n"
        };
    });
    if (spellData.higher_level.length) {
        spellData.higher_level.map(str => {
            description += `\n**At Higher Levels:** ${str}`
        });
    };

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
        subclasses: spellData.subclasses.map(subcls => subcls.name)
    };

    if (spellData.material) newSpellData.materialComponents = spellData.material;

    return newSpellData;
};

const translateFeatureData = (featureName, featureData) => {
    let description = "";
    featureData.desc.map((par, idx) => {
        description += par;
        if (idx + 1 !== featureData.desc.length) {
            description += "\n"
        };
    });

    const newFeatureData = {
        name: featureName.split("''").join("'"),
        class: featureData.class.name,
        description
    };

    if (featureData.subclass) newFeatureData.subclass = featureData.subclass.name;

    return newFeatureData;
};

const translateTraitData = (traitData) => {
    let description = "";
    traitData.desc.map((par, idx) => {
        description += par;
        if (idx + 1 !== traitData.desc.length) {
            description += "\n"
        };
    });

    const newFeatureData = {
        name: traitData.name,
        description,
        species: traitData.races.map(species => species.name),
        subspecies: traitData.subraces.map(subspecies => subspecies.name)
    };

    return newFeatureData;
};

const updateDatabase = async () => {
    try {
        client.connect();
        await updateTables();
        await updateSpellList();
        await updateFeatureList();
        await addTraitsToFeaturesList();
    } catch (error) {
        console.error(error);
    };
};

updateDatabase()
    .catch(console.error)
    .finally(() => client.end());