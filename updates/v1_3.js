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
            ADD COLUMN IF NOT EXISTS subclass VARCHAR(32);
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
            // if (spell.name === "True Strike" || spell.name === "Burning Hands" || spell.name === "Shillelagh") {
            //     console.log(spellData);
            //     console.log(translateSpellData(spellName, spellData));
            // }
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
                `, [classesArrayString, subclassesArrayString, spellData.name]);
            } else {
                const newData = translateSpellData(spellName, spellData);
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

const translateSpellData = (spellName, spellData) => {
    let description = "";
    spellData.desc.map((par, idx) => {
        description += par;
        if (idx + 1 !== spellData.desc.length) {
            description += "\n"
        }
    });
    if (spellData.higher_level.length) {
        spellData.higher_level.map(str => {
            description += `\n**At Higher Levels:** ${str}`
        });
    };

    const newSpellData = {
        name: spellName,
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

const testUpdates = async () => {
    try {
        const { rows: spells } = await client.query(`
            SELECT *
            FROM spells;
        `);
        const { rows: features } = await client.query(`
            SELECT *
            FROM features;
        `);
        console.log(spells);
        console.log(features);
    } catch (error) {
        console.error(error);
    };
};

const updateDatabase = async () => {
    try {
        client.connect();
        await updateTables();
        await updateSpellList();
        // await testUpdates();
    } catch (error) {
        console.error(error);
    };
};

updateDatabase()
    .catch(console.error)
    .finally(() => client.end());