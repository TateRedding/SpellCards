import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallSpellCard from "./SmallSpellCard";
import SearchBar from "../SearchBar";

const AllSpells = ({ spells, getSpells, spellLevels, sortingFunctions, createLevelString }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);

    const navigate = useNavigate();

    return (
        <>
            <button className="btn btn-success mb-3" onClick={() => navigate("/spells/new")}>New Spell</button>
            <div className="spell-tools d-flex mb-3">
                <SearchBar className="spell-search" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                                spellLevels.map((level, idx) => <option value={level} key={idx}>{level}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sort-select">Order: </label>
                        <select
                            className="form-select"
                            id="sort-select"
                            value={selectedSort}
                            onChange={(event) => setSelectedSort(event.target.value)}
                        >
                            {
                                sortingFunctions.map((sort, idx) => <option value={idx} key={idx}>{sort.name}</option>)
                            }
                        </select>
                    </div>
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
                            key={spell.id}
                        />
                    })
            }
        </>
    );
};

export default AllSpells;