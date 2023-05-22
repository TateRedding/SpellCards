import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import AllFeatures from "./components/Features/AllFeatures";
import AllSpells from "./components/Spells/AllSpells";
import EditSpell from "./components/Spells/EditSpell";
import Header from "./components/Header";
import NewSpell from "./components/Spells/NewSpell";

const App = () => {

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

    return (
        <>
            <Header />
            <main className="w-75 mx-auto">
                <Routes>
                    <Route path="/features" element={<AllFeatures />} />
                    <Route path="/spells" element={<AllSpells />} />
                    <Route path="/spells/new" element={
                        <NewSpell
                            schools={schools}
                        />} />
                    <Route path="/spells/edit/:spellId" element={
                        <EditSpell
                            schools={schools}
                        />} />
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