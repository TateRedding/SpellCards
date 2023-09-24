import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import FeatureDetails from "./Features/FeatureDetails";
import LevelSelect from "./LevelSelect";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import SpellDetails from "./Spells/SpellDetails";
import { allSortingFunctions } from "../lists";
import PlayerPageTab from "./PlayerPageTab";

const PlayerPage = ({
    player,
    allSpells,
    allFeatures,
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

    const renderDetails = (listItem) => {
        if (tab === "spells") {
            return (
                <SpellDetails
                    spell={listItem}
                    getPlayerData={getPlayerData}
                    key={listItem.id}
                />
            );
        } else if (tab === "features") {
            return (
                <FeatureDetails
                    feature={listItem}
                    getPlayerData={getPlayerData}
                    key={listItem.id}
                />
            )
        }
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
                        sortingFunctions={tab === "spells" ? allSortingFunctions : tab === "features" ? allSortingFunctions.slice(0, 2) : null}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                    />
                </div>
            </div>
            {
                (tab === "spells") ?
                    <PlayerPageTab
                        addFunc={addSpell}
                        allList={allSpells}
                        alreadyOnList={alreadyOnList}
                        loggedInPlayer={loggedInPlayer}
                        playerData={playerData}
                        playerList={playerData.spells}
                        renderDetails={renderDetails}
                        searchTerm={searchTerm}
                        selectedId={selectedSpellId}
                        selectedSort={selectedSort}
                        selectedSpellLevel={selectedSpellLevel}
                        setSelectedId={setSelectedSpellId}
                        type={"spell"}
                    />
                    :
                    null
            }
            {
                (tab === "features") ?
                    <PlayerPageTab
                        addFunc={addFeature}
                        allList={allFeatures}
                        alreadyOnList={alreadyOnList}
                        loggedInPlayer={loggedInPlayer}
                        playerData={playerData}
                        playerList={playerData.features}
                        renderDetails={renderDetails}
                        searchTerm={searchTerm}
                        selectedId={selectedFeatureId}
                        selectedSort={selectedSort}
                        setSelectedId={setSelectedFeatureId}
                        type={"feature"}
                    />
                    :
                    null
            }
        </>
    );
};

export default PlayerPage