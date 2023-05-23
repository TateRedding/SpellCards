import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import AllFeatures from "./components/Features/AllFeatures";
import AllSpells from "./components/Spells/AllSpells";
import EditFeature from "./components/Features/EditFeature"
import EditSpell from "./components/Spells/EditSpell";
import Header from "./components/Header";
import NewFeature from "./components/Features/NewFeature";
import NewSpell from "./components/Spells/NewSpell";
import PlayerPage from "./components/PlayerPage";

const App = () => {
    const [players, setPlayers] = useState([]);

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

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await axios.get("/api/players");
                setPlayers(response.data);
            } catch (error) {
                console.error(error);
            };
        };
        getPlayers();
    }, []);

    return (
        <>
            <Header players={players} />
            <main className="w-75 mx-auto">
                <Routes>
                    <Route path="/features" element={<AllFeatures />} />
                    <Route path="/features/new" element={<NewFeature />} />
                    <Route path="/features/edit/:featureId" element={<EditFeature />} />
                    <Route path="/spells" element={<AllSpells />} />
                    <Route path="/spells/new" element={
                        <NewSpell
                            schools={schools}
                        />} />
                    <Route path="/spells/edit/:spellId" element={
                        <EditSpell
                            schools={schools}
                        />} />
                    {
                        players.map(player => <Route path={`/${player.name}`} element={<PlayerPage player={player} />} key={player.id} />)
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