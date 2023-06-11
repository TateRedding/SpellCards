import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import FeatureDetails from "./Features/FeatureDetails";
import LevelSelect from "./LevelSelect";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
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
    const [playerData, setPlayerData] = useState({});
    const [selectedSpellSort, setSelectedSpellSort] = useState(0);
    const [maxSpellLevel, setMaxSpellLevel] = useState(0);
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [spellSearchTerm, setSpellSearchTerm] = useState('');
    const [selectedSpellId, setSelectedSpellId] = useState('');
    const [spellAlreadyOnList, setSpellAlreadyOnList] = useState(false);
    const [selectedFeatureSort, setSelectedFeatureSort] = useState(0);
    const [featureSearchTerm, setFeatureSearchTerm] = useState('');
    const [selectedFeatureId, setSelectedFeatureId] = useState('');
    const [featureAlreadyOnList, setFeatureAlreadyOnList] = useState(false);

    const useQuery = () => {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    };
    
    const query = useQuery();
    const tab = query.get("tab");

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
        setSelectedSpellLevel('');
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
                    <Link
                        to={`/${player.shortName.toLowerCase()}?tab=spells`}
                        className={!tab || tab === 'spells' ? "nav-link active" : "nav-link"}
                    >
                        Spells
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to={`/${player.shortName.toLowerCase()}?tab=features`}
                        className={tab === 'features' ? "nav-link active" : "nav-link"}
                    >
                        Features
                    </Link>
                </li>
            </ul>
            {
                (!tab || tab === "spells") ?
                    <>
                        <div className="spell-tools d-flex mb-3">
                            <SearchBar
                                className="spell-search"
                                searchTerm={spellSearchTerm}
                                setSearchTerm={setSpellSearchTerm}
                            />
                            <div className="d-flex">
                                <LevelSelect
                                    spellLevels={spellLevels}
                                    selectedSpellLevel={selectedSpellLevel}
                                    setSelectedSpellLevel={setSelectedSpellLevel}
                                    maxSpellLevel={maxSpellLevel}
                                />
                                <SortSelect
                                    sortingFunctions={sortingFunctions}
                                    selectedSort={selectedSpellSort}
                                    setSelectedSort={setSelectedSpellSort}
                                />
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
                                        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
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
                            <SearchBar
                                className="me-3"
                                searchTerm={featureSearchTerm}
                                setSearchTerm={setFeatureSearchTerm}
                            />
                            <SortSelect
                                sortingFunctions={sortingFunctions.slice(0, 2)}
                                selectedSort={selectedFeatureSort}
                                setSelectedSort={setSelectedFeatureSort}
                            />
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