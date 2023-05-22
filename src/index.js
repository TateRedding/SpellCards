import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import AllSpells from "./components/Spells/AllSpells";
import Header from "./components/Header";

const App = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/spells" element={<AllSpells />} />
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