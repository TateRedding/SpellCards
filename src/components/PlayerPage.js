import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import FeatureDetails from "./Features/FeatureDetails";
import LevelSelect from "./LevelSelect";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import SpellDetails from "./Spells/SpellDetails";
import { allSortingFunctions } from "../lists";

const PlayerPage = ({
    player,
    allSpells,
    allFeatures,
    formatText,
    createComponentsString,
    createDurationString,
    createLevelString,
    loggedInPlayer
}) => {
    const [playerData, setPlayerData] = useState({});
    const [selectedSort, setSelectedSort] = useState(0);
    const [maxSpellLevel, setMaxSpellLevel] = useState(0);
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpellId, setSelectedSpellId] = useState('');
    const [alreadyOnList, setAlreadyOnList] = useState(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState('');

    const useQuery = () => {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    };

    const query = useQuery();
    const tab = query.get("tab") ? query.get("tab") : "spells";

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
        setAlreadyOnList(false);
        try {
            const response = await axios.post("/api/player_spells", {
                playerId: playerData.id,
                spellId: selectedSpellId
            });
            if (response.data) {
                if (response.data.name === "PlayerSpellAlreadyExists") {
                    setAlreadyOnList(true);
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
        setAlreadyOnList(false);
        try {
            const response = await axios.post("/api/player_features", {
                playerId: playerData.id,
                featureId: selectedFeatureId
            });
            if (response.data) {
                if (response.data.name === "PlayerFeatureAlreadyExists") {
                    setAlreadyOnList(true);
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
        setAlreadyOnList(false);
        setSearchTerm('');
    }, [player]);

    useEffect(() => {
        if (playerData.spells) {
            setMaxSpellLevel(Math.max(...playerData.spells.map(spell => spell.level)));
        };
    }, [playerData])

    useEffect(() => {
        setSearchTerm('');
        setSelectedSort(0);
        setSelectedSpellLevel('');
        setAlreadyOnList(false);
    }, [tab]);

    useEffect(() => {
        setAlreadyOnList(false);
    }, [selectedSpellId, selectedFeatureId]);

    return (
        <>
            <h2>{playerData.name}</h2>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <Link
                        to={`/${player.urlName.toLowerCase()}?tab=spells`}
                        className={tab === 'spells' ? "nav-link active" : "nav-link"}
                    >
                        Spells
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to={`/${player.urlName.toLowerCase()}?tab=features`}
                        className={tab === 'features' ? "nav-link active" : "nav-link"}
                    >
                        Features
                    </Link>
                </li>
            </ul>
            <SearchBar
                className={tab === "spells" ? "spell-search" : tab === "features" ? "me-3" : null}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="d-flex mb-3">
                <div className={tab === "spells" ? "d-flex" : null}>
                    {tab === "spells" ?
                        <LevelSelect
                            selectedSpellLevel={selectedSpellLevel}
                            setSelectedSpellLevel={setSelectedSpellLevel}
                            maxSpellLevel={maxSpellLevel}
                        />
                        :
                        null
                    }
                    <SortSelect
                        sortingFunctions={tab === "spells" ? allSortingFunctions: tab === "features" ? allSortingFunctions.slice(0, 2) : null}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                    />
                </div>
            </div>
            {
                (tab === "spells") ?
                    <>
                        <div>
                            {
                                (playerData.spells) ?
                                    playerData.spells
                                        .filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .filter(spell => {
                                            if (selectedSpellLevel) {
                                                return spell.level === Number(selectedSpellLevel);
                                            } else {
                                                return true;
                                            }
                                        })
                                        .sort(allSortingFunctions[selectedSort].func)
                                        .map(spell => {
                                            return <SpellDetails
                                                spell={spell}
                                                getPlayerData={getPlayerData}
                                                key={spell.id}
                                            />
                                        })
                                    :
                                    null
                            }
                        </div>
                        {
                            loggedInPlayer.id === playerData.id || loggedInPlayer.isAdmin ?
                                <form onSubmit={addSpell} autoComplete="off">
                                    <div className="d-flex">
                                        <button className="btn btn-success me-2" type="submit">Add Spell</button>

                                        <select
                                            className={
                                                (alreadyOnList) ?
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
                                    </div>
                                    <div className="form-text" id="spell-on-list-text">
                                        {
                                            (alreadyOnList) ?
                                                "This spell is already on your list!" :
                                                null
                                        }
                                    </div>
                                </form>
                                :
                                null
                        }
                    </>
                    :
                    null
            }
            {
                (tab === "features") ?
                    <>
                        <div>
                            {
                                (playerData.features) ?
                                    playerData.features
                                        .filter(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .sort(allSortingFunctions[selectedSort].func)
                                        .map(feature => {
                                            return <FeatureDetails
                                                feature={feature}
                                                getPlayerData={getPlayerData}
                                                key={feature.id}
                                            />
                                        })
                                    :
                                    null
                            }
                        </div>
                        {
                            loggedInPlayer.id === playerData.id || loggedInPlayer.isAdmin ?
                                <form onSubmit={addFeature} autoComplete="off">
                                    <div className="d-flex">
                                        <button className="btn btn-success me-2" type="submit">Add Feature</button>
                                        <select
                                            className={
                                                (alreadyOnList) ?
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
                                    </div>
                                    <div className="form-text" id="feature-on-list-text">
                                        {
                                            (alreadyOnList) ?
                                                "This feature is already on your list!" :
                                                null
                                        }
                                    </div>
                                </form>
                                :
                                null
                        }
                    </>
                    :
                    null
            }
        </>
    );
};

export default PlayerPage