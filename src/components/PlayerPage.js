import React, { useState, useEffect } from "react";
import axios from "axios";

import FeatureDetails from "./Features/FeatureDetails";
import SpellDetails from "./Spells/SpellDetails";

const PlayerPage = ({
    player,
    allSpells,
    allFeatures,
    spellLevels,
    sortingFunctions,
    formatText,
    createComponentsString,
    createDurationString,
    createLevelString
}) => {
    const [tab, setTab] = useState("spells");
    const [playerData, setPlayerData] = useState({});
    const [selectedSpellSort, setSelectedSpellSort] = useState(0);
    const [maxSpellLevel, setMaxSpellLevel] = useState(0);
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [spellSearchTerm, setSpellSearchTerm] = useState('');
    const [selectedSpellId, setSelectedSpellId] = useState('');
    const [spellAlreadyOnList, setSpellAlreadyOnList] = useState(false);
    const [selectedFeatureSort, setSelectedFeatureSort] = useState(0);
    const [featureSearchTerm, setFeatureSearchTerm] = useState('');
    const [showFeatureSelect, setShowFeatureSelect] = useState(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState('');
    const [featureAlreadyOnList, setFeatureAlreadyOnList] = useState(false);

    const getPlayerData = async () => {
        try {
            const response = await axios.get(`/api/players/${player.id}`);
            setPlayerData(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const addSpell = async (event) => {
        event.preventDefault();
        setSpellAlreadyOnList(false);
        try {
            const response = await axios.post("/api/player_spells", {
                playerId: playerData.id,
                spellId: selectedSpellId
            });
            if (response.data) {
                if (response.data.name === "PlayerSpellAlreadyExists") {
                    setSpellAlreadyOnList(true);
                } else {
                    setSelectedSpellId('');
                    getPlayerData();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    const addFeature = async (event) => {
        event.preventDefault();
        setFeatureAlreadyOnList(false);
        try {
            const response = await axios.post("/api/player_features", {
                playerId: playerData.id,
                featureId: selectedFeatureId
            });
            if (response.data) {
                if (response.data.name === "PlayerFeatureAlreadyExists") {
                    setFeatureAlreadyOnList(true);
                } else {
                    setSelectedFeatureId('');
                    getPlayerData();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getPlayerData();
    }, []);

    useEffect(() => {
        getPlayerData();
        setSelectedSpellId('');
        setSelectedFeatureId('');
        setSpellAlreadyOnList(false);
        setFeatureAlreadyOnList(false);
        setSpellSearchTerm('');
        setFeatureSearchTerm('');
    }, [player]);

    useEffect(() => {
        if (playerData.spells) {
            setMaxSpellLevel(Math.max(...playerData.spells.map(spell => spell.level)));
        };
    }, [playerData])

    useEffect(() => {
        setSpellSearchTerm('');
        setFeatureSearchTerm('');
    }, [tab, selectedSpellLevel]);

    useEffect(() => {
        setSpellAlreadyOnList(false);
    }, [selectedSpellId]);

    useEffect(() => {
        setFeatureAlreadyOnList(false);
    }, [selectedFeatureId]);

    return (
        <>
            <h2>{playerData.name}</h2>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={
                            (tab === "spells") ?
                                "nav-link active" :
                                "nav-link"
                        }
                        onClick={() => setTab("spells")}>Spells</button>
                </li>
                <li className="nav-item">
                    <button
                        className={
                            (tab === "features") ?
                                "nav-link active" :
                                "nav-link"
                        }
                        onClick={() => setTab("features")}>Features</button>
                </li>
            </ul>
            {
                (tab === "spells") ?
                    <>
                        <div className="spell-tools d-flex mb-3">
                            <div className="spell-search form-floating">
                                <input
                                    className="form-control"
                                    id="searchInput-player-spells"
                                    value={spellSearchTerm}
                                    placeholder="Search"
                                    onChange={(event) => setSpellSearchTerm(event.target.value)}
                                />
                                <label htmlFor="searchInput" className="form-label">Search</label>
                            </div>
                            <div className="d-flex">
                                <div className="me-3">
                                    <label htmlFor="level-filter">Level</label>
                                    <select
                                        className="form-select"
                                        id="level-filter"
                                        value={selectedSpellLevel}
                                        onChange={(event) => setSelectedSpellLevel(event.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value={0}>Cantrip</option>
                                        {
                                            spellLevels
                                                .slice(0, maxSpellLevel)
                                                .map((level, idx) => <option value={level} key={idx}>{level}</option>)
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="sort-select">Order: </label>
                                    <select
                                        className="form-select"
                                        id="sort-select"
                                        value={selectedSpellSort}
                                        onChange={(event) => setSelectedSpellSort(event.target.value)}
                                    >
                                        {
                                            sortingFunctions.map((sort, idx) => <option value={idx} key={idx}>{sort.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                (playerData.spells) ?
                                    playerData.spells
                                        .filter(spell => spell.name.toLowerCase().includes(spellSearchTerm.toLowerCase()))
                                        .filter(spell => {
                                            if (selectedSpellLevel) {
                                                return spell.level === Number(selectedSpellLevel);
                                            } else {
                                                return true;
                                            }
                                        })
                                        .sort(sortingFunctions[selectedSpellSort].func)
                                        .map(spell => {
                                            return <SpellDetails
                                                spell={spell}
                                                getPlayerData={getPlayerData}
                                                formatText={formatText}
                                                createComponentsString={createComponentsString}
                                                createDurationString={createDurationString}
                                                createLevelString={createLevelString}
                                                key={spell.id}
                                            />
                                        })
                                    :
                                    null
                            }
                        </div>
                        <form className="d-flex" onSubmit={addSpell} autoComplete="off">
                            <button className="btn btn-success me-2" type="submit">Add Spell</button>
                            <select
                                className={
                                    (spellAlreadyOnList) ?
                                        "form-select is-invalid" :
                                        "form-select"
                                }
                                aria-labelledby="spell-on-list-text"
                                value={selectedSpellId}
                                required
                                onChange={(event) => setSelectedSpellId(event.target.value)}
                            >
                                <option value="">Select Spell</option>
                                {
                                    allSpells
                                        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1)
                                        .map(spell => <option value={`${spell.id}`} key={spell.id}>{spell.name}</option>)
                                }
                            </select>
                            <div className="form-text" id="spell-on-list-text">
                                {
                                    (spellAlreadyOnList) ?
                                        "This spell is already on your list!" :
                                        null
                                }
                            </div>
                        </form>
                    </> :
                    null
            }
            {
                (tab === "features") ?
                    <>
                        <div className="d-flex align-items-end mb-3">
                            <div className="form-floating me-3">
                                <input
                                    className="form-control"
                                    id="searchInput-player-spells"
                                    value={featureSearchTerm}
                                    placeholder="Search"
                                    onChange={(event) => setFeatureSearchTerm(event.target.value)}
                                />
                                <label htmlFor="searchInput" className="form-label">Search</label>
                            </div>
                            <div>
                                <label htmlFor="sort-select">Order: </label>
                                <select
                                    className="form-select"
                                    id="sort-select"
                                    value={selectedFeatureSort}
                                    onChange={(event) => setSelectedFeatureSort(event.target.value)}
                                >
                                    {
                                        sortingFunctions
                                            .slice(0, 2)
                                            .map((sort, idx) => <option value={idx} key={idx}>{sort.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            {
                                (playerData.features) ?
                                    playerData.features
                                        .filter(feature => feature.name.toLowerCase().includes(featureSearchTerm.toLowerCase()))
                                        .sort(sortingFunctions[selectedFeatureSort].func)
                                        .map(feature => {
                                            return <FeatureDetails
                                                feature={feature}
                                                getPlayerData={getPlayerData}
                                                formatText={formatText}
                                                key={feature.id}
                                            />
                                        })
                                    :
                                    null
                            }
                        </div>
                        <form className="d-flex" onSubmit={addFeature} autoComplete="off">
                            <button className="btn btn-success me-2" type="submit">Add Feature</button>
                            <select
                                className={
                                    (featureAlreadyOnList) ?
                                        "form-select is-invalid" :
                                        "form-select"
                                }
                                aria-labelledby="feature-on-list-text"
                                value={selectedFeatureId}
                                required
                                onChange={(event) => setSelectedFeatureId(event.target.value)}
                            >
                                <option value="">Select Feature</option>
                                {
                                    allFeatures
                                        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                                        .map(feature => <option value={`${feature.id}`} key={feature.id}>{feature.name}</option>)
                                }
                            </select>
                            <div className="form-text" id="feature-on-list-text">
                                {
                                    (featureAlreadyOnList) ?
                                        "This feature is already on your list!" :
                                        null
                                }
                            </div>
                        </form>
                    </> :
                    null
            }
        </>
    );
};

export default PlayerPage