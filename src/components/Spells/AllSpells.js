import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LevelSelect from "../LevelSelect";
import SearchBar from "../SearchBar";
import SmallSpellCard from "./SmallSpellCard";
import SortSelect from "../SortSelect";

const AllSpells = ({ spells, getSpells, spellLevels, sortingFunctions, createLevelString, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);

    const navigate = useNavigate();

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <button className="btn btn-success mb-3" onClick={() => navigate("/spells/new")}>New Spell</button>

                    :
                    null
            }
            <div className="spell-tools d-flex mb-3">
                <SearchBar
                    className="spell-search"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <div className="d-flex">
                    <LevelSelect
                        spellLevels={spellLevels}
                        selectedSpellLevel={selectedSpellLevel}
                        setSelectedSpellLevel={setSelectedSpellLevel}
                    />
                    <SortSelect
                        sortingFunctions={sortingFunctions}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                    />
                </div>
            </div>
            {
                spells
                    .filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter(spell => {
                        if (selectedSpellLevel) {
                            return spell.level === Number(selectedSpellLevel);
                        } else {
                            return true;
                        }
                    })
                    .sort(sortingFunctions[selectedSort].func)
                    .map(spell => {
                        return <SmallSpellCard
                            spell={spell}
                            getSpells={getSpells}
                            createLevelString={createLevelString}
                            loggedInPlayer={loggedInPlayer}
                            key={spell.id}
                        />
                    })
            }
        </>
    );
};

export default AllSpells;