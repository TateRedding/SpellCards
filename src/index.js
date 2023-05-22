import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import AllFeatures from "./components/Features/AllFeatures";
import AllSpells from "./components/Spells/AllSpells";
import Header from "./components/Header";
import NewSpell from "./components/Spells/NewSpell";

const App = () => {
    return (
        <>
            <Header />
            <main className="w-75 mx-auto">
                <Routes>
                    <Route path="/features" element={<AllFeatures />} />
                    <Route path="/spells" element={<AllSpells />} />
                    <Route path="/spells/new" element={<NewSpell />} />
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