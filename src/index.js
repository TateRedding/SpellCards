import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import AllFeatures from "./components/Features/AllFeatures";
import AllItems from "./components/Items/AllItems";
import AllQuests from "./components/Quests/AllQuests";
import AllSpells from "./components/Spells/AllSpells";
import AllTraits from "./components/Traits/AllTraits";
import EditFeature from "./components/Features/EditFeature"
import EditItem from "./components/Items/EditItem";
import EditQuest from "./components/Quests/EditQuest";
import EditSpell from "./components/Spells/EditSpell";
import EditTrait from "./components/Traits/EditTrait";
import Header from "./components/Header";
import Home from "./components/Home";
import NewFeature from "./components/Features/NewFeature";
import NewItem from "./components/Items/NewItem"
import NewQuest from "./components/Quests/NewQuest";
import NewSpell from "./components/Spells/NewSpell";
import NewTrait from "./components/Traits/NewTrait";
import PlayerPage from "./components/PlayerPage";
import SingleTrait from "./components/Traits/SingleTrait";
import SignIn from "./components/SignIn";
import { activePlayers } from "./lists";

const App = () => {
    const TOKEN_NAME = "coswtfs-spells-login-id";
    const [features, setFeatures] = useState([]);
    const [items, setItems] = useState([]);
    const [players, setPlayers] = useState([]);
    const [quests, setQuests] = useState([]);
    const [spells, setSpells] = useState([]);
    const [traits, setTraits] = useState([]);
    const [loginId, setLoginId] = useState(window.localStorage.getItem(TOKEN_NAME));
    const [loggedInPlayer, setLoggedInPlayer] = useState({});

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

    const getTraits = async () => {
        try {
            const response = await axios.get("/api/traits");
            setTraits(response.data);
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
        getTraits();
    }, []);

    useEffect(() => {
        if (players.length && loginId) {
            setLoggedInPlayer(players.find(player => player.id === Number(loginId)));
        };
    }, [players]);

    return (
        <>
            <Header
                players={players}
                loginId={loginId}
                setLoginId={setLoginId}
                setLoggedInPlayer={setLoggedInPlayer}
                TOKEN_NAME={TOKEN_NAME}
            />
            <main>
                <Routes>
                    <Route path="/" element={<Home players={players} />} />
                    <Route path="/signin" element={
                        <SignIn
                            players={players}
                            setLoginId={setLoginId}
                            setLoggedInPlayer={setLoggedInPlayer}
                            TOKEN_NAME={TOKEN_NAME}
                        />
                    } />
                    <Route path="/features" element={
                        <AllFeatures
                            features={features}
                            getFeatures={getFeatures}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/features/new" element={
                        <NewFeature
                            getFeatures={getFeatures}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/features/edit/:featureId" element={
                        <EditFeature
                            getFeatures={getFeatures}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/items" element={
                        <AllItems
                            items={items}
                            getItems={getItems}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/items/new" element={
                        <NewItem
                            getItems={getItems}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/items/edit/:itemId" element={
                        <EditItem
                            getItems={getItems}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/quests" element={
                        <AllQuests
                            quests={quests}
                            getQuests={getQuests}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/quests/new" element={
                        <NewQuest
                            getQuests={getQuests}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/quests/edit/:questId" element={
                        <EditQuest
                            getQuests={getQuests}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/spells" element={
                        <AllSpells
                            spells={spells}
                            getSpells={getSpells}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/spells/new" element={
                        <NewSpell
                            getSpells={getSpells}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/spells/edit/:spellId" element={
                        <EditSpell
                            getSpells={getSpells}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/traits" element={
                        <AllTraits
                            traits={traits}
                            getTraits={getTraits}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/traits/new" element={
                        <NewTrait
                            getTraits={getTraits}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    <Route path="/traits/edit/:traitId" element={
                        <EditTrait
                            getTraits={getTraits}
                            loggedInPlayer={loggedInPlayer}
                        />
                    } />
                    {
                        players.map(player => {
                            if (activePlayers.includes(player.name)) {
                                return <Route
                                    path={`/${player.urlName}`}
                                    element={
                                        <PlayerPage
                                            allFeatures={features}
                                            allSpells={spells}
                                            allTraits={traits}
                                            loggedInPlayer={loggedInPlayer}
                                            player={player}
                                        />
                                    }
                                    key={player.id} />
                            };
                        })
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