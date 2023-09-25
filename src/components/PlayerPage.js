import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { allSortingFunctions } from "../lists";
import LevelSelect from "./LevelSelect";
import PlayerPageFeatures from "./Features/PlayerPageFeatures";
import PlayerPageSpell from "./Spells/PlayerPageSpell";
import PlayerPageTab from "./PlayerPageTab";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import PlayerPageTrait from "./Traits/PlayerPageTrait";

const PlayerPage = ({
    allFeatures,
    allSpells,
    allTraits,
    loggedInPlayer,
    player
}) => {
    const [adding, setAdding] = useState(false);
    const [alreadyOnList, setAlreadyOnList] = useState(false);
    const [maxSpellLevel, setMaxSpellLevel] = useState(0);
    const [playerData, setPlayerData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFeatureId, setSelectedFeatureId] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);
    const [selectedSpellId, setSelectedSpellId] = useState('');
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [selectedTraitId, setSelectedTraitId] = useState('');

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

    const renderDetails = (listItem) => {
        if (tab === "spells") {
            return (
                <PlayerPageSpell
                    getPlayerData={getPlayerData}
                    loggedInPlayer={loggedInPlayer}
                    spell={listItem}
                    key={listItem.id}
                />
            );
        } else if (tab === "features") {
            return (
                <PlayerPageFeatures
                    feature={listItem}
                    getPlayerData={getPlayerData}
                    loggedInPlayer={loggedInPlayer}
                    key={listItem.id}
                />
            );
        } else if (tab === "traits") {
            return (
                <PlayerPageTrait
                    getPlayerData={getPlayerData}
                    loggedInPlayer={loggedInPlayer}
                    trait={listItem}
                    key={listItem.id}
                />
            );
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
        setAdding(false);
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
        setAdding(false);
    }, [tab]);

    useEffect(() => {
        setAlreadyOnList(false);
    }, [selectedSpellId, selectedFeatureId, selectedTraitId]);

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
                <li className="nav-item">
                    <Link
                        to={`/${player.urlName.toLowerCase()}?tab=traits`}
                        className={tab === 'traits' ? "nav-link active" : "nav-link"}
                    >
                        Traits
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
                        sortingFunctions={tab === "spells" ? allSortingFunctions : allSortingFunctions.slice(0, 2)}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                    />
                </div>
            </div>
            {
                (tab === "spells") ?
                    <PlayerPageTab
                        adding={adding}
                        allList={allSpells}
                        alreadyOnList={alreadyOnList}
                        getPlayerData={getPlayerData}
                        loggedInPlayer={loggedInPlayer}
                        playerData={playerData}
                        playerList={playerData.spells}
                        renderDetails={renderDetails}
                        searchTerm={searchTerm}
                        selectedId={selectedSpellId}
                        selectedSort={selectedSort}
                        selectedSpellLevel={selectedSpellLevel}
                        setSelectedId={setSelectedSpellId}
                        setAdding={setAdding}
                        setAlreadyOnList={setAlreadyOnList}
                        type={"spell"}
                    />
                    :
                    null
            }
            {
                (tab === "features") ?
                    <PlayerPageTab
                        adding={adding}
                        allList={allFeatures}
                        alreadyOnList={alreadyOnList}
                        getPlayerData={getPlayerData}
                        loggedInPlayer={loggedInPlayer}
                        playerData={playerData}
                        playerList={playerData.features}
                        renderDetails={renderDetails}
                        searchTerm={searchTerm}
                        selectedId={selectedFeatureId}
                        selectedSort={selectedSort}
                        setSelectedId={setSelectedFeatureId}
                        setAdding={setAdding}
                        setAlreadyOnList={setAlreadyOnList}
                        type={"feature"}
                    />
                    :
                    null
            }
            {
                (tab === "traits") ?
                    <PlayerPageTab
                        adding={adding}
                        allList={allTraits}
                        alreadyOnList={alreadyOnList}
                        getPlayerData={getPlayerData}
                        loggedInPlayer={loggedInPlayer}
                        playerData={playerData}
                        playerList={playerData.traits}
                        renderDetails={renderDetails}
                        searchTerm={searchTerm}
                        selectedId={selectedTraitId}
                        selectedSort={selectedSort}
                        setSelectedId={setSelectedTraitId}
                        setAdding={setAdding}
                        setAlreadyOnList={setAlreadyOnList}
                        type={"trait"}
                    />
                    :
                    null
            }
        </>
    );
};

export default PlayerPage