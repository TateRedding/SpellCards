import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import {
    itemCategories,
    rarities,
    schools,
    sortingFunctions,
    spellLevels
} from "./lists";
import {
    formatText,
    createComponentsString,
    createDurationString,
    createLevelString
} from "./utils";

import AllFeatures from "./components/Features/AllFeatures";
import AllItems from "./components/Items/AllItems";
import AllQuests from "./components/Quests/AllQuests";
import AllSpells from "./components/Spells/AllSpells";
import EditFeature from "./components/Features/EditFeature"
import EditItem from "./components/Items/EditItem";
import EditQuest from "./components/Quests/EditQuest";
import EditSpell from "./components/Spells/EditSpell";
import Header from "./components/Header";
import Home from "./components/Home";
import NewFeature from "./components/Features/NewFeature";
import NewItem from "./components/Items/NewItem"
import NewQuest from "./components/Quests/NewQuest";
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

    const getPlayers = async () => {
        try {
            const response = await axios.get("/api/players");
            setPlayers(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getSpells = async () => {
        try {
            const response = await axios.get("/api/spells");
            setSpells(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getFeatures = async () => {
        try {
            const response = await axios.get("/api/features");
            setFeatures(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getItems = async () => {
        try {
            const response = await axios.get("/api/items");
            setItems(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getQuests = async () => {
        try {
            const response = await axios.get("/api/quests");
            setQuests(response.data);
        } catch (error) {
            console.error(error);
        };
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
                    <Route path="/items/new" element={
                        <NewItem
                            itemCategories={itemCategories}
                            rarities={rarities}
                            getItems={getItems}
                        />
                    } />
                    <Route path="/items/edit/:itemId" element={
                        <EditItem
                            itemCategories={itemCategories}
                            rarities={rarities}
                            getItems={getItems}
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
                    <Route path="/quests/new" element={
                        <NewQuest
                            getQuests={getQuests}
                        />
                    } />
                    <Route path="/quests/edit/:questId" element={
                        <EditQuest
                            getQuests={getQuests}
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
                            path={`/${player.shortName}`}
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