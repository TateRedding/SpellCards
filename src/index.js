import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import AllFeatures from "./components/Features/AllFeatures";
import AllSpells from "./components/Spells/AllSpells";
import EditFeature from "./components/Features/EditFeature"
import EditSpell from "./components/Spells/EditSpell";
import Header from "./components/Header";
import Home from "./components/Home";
import NewFeature from "./components/Features/NewFeature";
import NewSpell from "./components/Spells/NewSpell";
import PlayerPage from "./components/PlayerPage";

const App = () => {
    const [features, setFeatures] = useState([]);
    const [players, setPlayers] = useState([]);
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

    const sortingFunctions = [
        {
            name: "A to Z",
            func: (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
        },
        {
            name: "Z to A",
            func: (a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        },
        {
            name: "Spell Level: Low to High",
            func: (a, b) => a.level > b.level ? -1 : 1
        },
        {
            name: "Spell Level: High to Low",
            func: (a, b) => a.level < b.level ? -1 : 1
        }
    ];

    const spellLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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

    useEffect(() => {
        getPlayers();
        getSpells();
        getFeatures();
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
                    <Route path="/spells" element={
                        <AllSpells
                            spells={spells}
                            getSpells={getSpells}
                            spellLevels={spellLevels}
                            sortingFunctions={sortingFunctions}
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