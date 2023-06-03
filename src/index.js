import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import AllFeatures from "./components/Features/AllFeatures";
import AllItems from "./components/Items/AllItems";
import AllQuests from "./components/Quests/AllQuests";
import AllSpells from "./components/Spells/AllSpells";
import EditFeature from "./components/Features/EditFeature"
import EditSpell from "./components/Spells/EditSpell";
import Header from "./components/Header";
import Home from "./components/Home";
import NewFeature from "./components/Features/NewFeature";
import NewSpell from "./components/Spells/NewSpell";
import PlayerPage from "./components/PlayerPage";
import SingleFeature from "./components/Features/SingleFeature";
import SingleSpell from "./components/Spells/SingleSpell";

const App = () => {
    const [features, setFeatures] = useState([]);
    const [items, setItems] = useState([]);
    const [players, setPlayers] = useState([]);
    const [quests, setQuests] = useState([]);
    const [spells, setSpells] = useState([]);

    const schools = [
        "Abjuration",
        "Conjuration",
        "Divination",
        "Enchantment",
        "Evocation",
        "Illusion",
        "Necromancy",
        "Transmutation"
    ];

    const itemCategories = [
        "Armor",
        "Potion",
        "Ring",
        "Rod",
        "Scroll",
        "Staff",
        "Wand",
        "Weapon",
        "Wonderous Item"
    ];

    const rarities = [
        "Common",
        "Uncommon",
        "Rare",
        "Very rare",
        "Legendary"
    ];

    const sortingFunctions = [
        {
            name: "A to Z",
            func: (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        },
        {
            name: "Z to A",
            func: (a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        },
        {
            name: "Spell Level: Low to High",
            func: (a, b) => a.level > b.level ? 1 : -1
        },
        {
            name: "Spell Level: High to Low",
            func: (a, b) => a.level < b.level ? 1 : -1
        }
    ];

    const spellLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const formatText = (text) => {
        const formattedText = text
            .split('\n')
            .map((paragraph, idx) => {
                return <p key={idx}>{
                    paragraph
                        .split('**')
                        .map((segment, idx) => {
                            if (idx % 2) {
                                if (idx === paragraph.split('**').length - 1) {
                                    return `**${segment}`
                                } else {
                                    return <b key={idx}>{segment}</b>
                                };
                            } else {
                                return segment
                            };
                        })
                }</p>
            });
        return formattedText;
    };

    const createComponentsString = (spell) => {
        const componentsArr = [];
        if (spell.verbal) {
            componentsArr.push("V");
        };
        if (spell.somatic) {
            componentsArr.push("S");
        };
        if (spell.material) {
            componentsArr.push("M");
        };
        let componentsString = componentsArr.join(", ");
        if (spell.materialComponents) {
            componentsString = `${componentsString} (${spell.materialComponents})`
        };
        return componentsString;
    };

    const createDurationString = (spell) => {
        let durationString = "";
        if (spell.concentration) {
            durationString = `Concentration, up to ${spell.duration}`;
        } else {
            durationString = spell.duration;
        };
        return durationString;
    };

    const createLevelString = (spell) => {
        let levelString = "";
        if (spell.level === 0) {
            levelString = "Cantrip, ";
        } else {
            levelString = `${spell.level}`;
            if (spell.level === 1) {
                levelString += "st"
            } else if (spell.level === 2) {
                levelString += "nd"
            } else if (spell.level === 3) {
                levelString += "rd"
            } else {
                levelString += "th"
            }
            levelString += " level ";
        }
        levelString += spell.school.toLowerCase();
        return levelString;
    };

    const getPlayers = async () => {
        try {
            const response = await axios.get("/api/players");
            setPlayers(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getSpells = async () => {
        const response = await axios.get("/api/spells");
        setSpells(response.data);
    };

    const getFeatures = async () => {
        const response = await axios.get("/api/features");
        setFeatures(response.data);
    };

    const getItems = async () => {
        const response = await axios.get("/api/items");
        setItems(response.data);
    };

    const getQuests = async () => {
        const response = await axios.get("/api/quests");
        setQuests(response.data);
    };

    useEffect(() => {
        getPlayers();
        getSpells();
        getFeatures();
        getItems();
        getQuests();
    }, []);

    return (
        <>
            <Header players={players} />
            <main>
                <Routes>
                    <Route path="/" element={
                        <Home
                            players={players}
                        />} />
                    <Route path="/features" element={
                        <AllFeatures
                            features={features}
                            getFeatures={getFeatures}
                            sortingFunctions={sortingFunctions.slice(0, 2)}
                        />} />
                    <Route path="/features/new" element={
                        <NewFeature
                            getFeatures={getFeatures}
                        />} />
                    <Route path="/features/edit/:featureId" element={
                        <EditFeature
                            getFeatures={getFeatures}
                        />} />
                    <Route path="/features/:featureId" element={
                        <SingleFeature
                            formatText={formatText}
                        />
                    } />
                    <Route path="/items" element={
                        <AllItems
                            items={items}
                            formatText={formatText}
                            getItems={getItems}
                            sortingFunctions={sortingFunctions.slice(0, 2)}
                        />
                    } />
                    <Route path="/quests" element={
                        <AllQuests
                            quests={quests}
                            formatText={formatText}
                            getQuests={getQuests}
                            sortingFunctions={sortingFunctions.slice(0, 2)}
                        />
                    } />
                    <Route path="/spells" element={
                        <AllSpells
                            spells={spells}
                            getSpells={getSpells}
                            spellLevels={spellLevels}
                            sortingFunctions={sortingFunctions}
                            createLevelString={createLevelString}
                        />} />
                    <Route path="/spells/new" element={
                        <NewSpell
                            schools={schools}
                            getSpells={getSpells}
                        />} />
                    <Route path="/spells/edit/:spellId" element={
                        <EditSpell
                            schools={schools}
                            getSpells={getSpells}
                        />} />
                    <Route path="/spells/:spellId" element={
                        <SingleSpell
                            createComponentsString={createComponentsString}
                            createDurationString={createDurationString}
                            createLevelString={createLevelString}
                            formatText={formatText}
                        />
                    } />
                    {
                        players.map(player => <Route
                            path={`/${player.name}`}
                            element={
                                <PlayerPage
                                    player={player}
                                    allSpells={spells}
                                    allFeatures={features}
                                    spellLevels={spellLevels}
                                    sortingFunctions={sortingFunctions}
                                    formatText={formatText}
                                    createComponentsString={createComponentsString}
                                    createDurationString={createDurationString}
                                    createLevelString={createLevelString}
                                />
                            }
                            key={player.id} />
                        )
                    }
                </Routes>
            </main>
        </>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);