import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassSelect from "../ClassSelect";
import LevelSelect from "../LevelSelect";
import SearchBar from "../SearchBar";
import SmallSpellCard from "./SmallSpellCard";
import SortSelect from "../SortSelect";
import { allSortingFunctions } from "../../lists";

const AllSpells = ({ spells, getSpells, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
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
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="d-flex mb-3">
                <LevelSelect
                    selectedSpellLevel={selectedSpellLevel}
                    setSelectedSpellLevel={setSelectedSpellLevel}
                />
                <ClassSelect
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                />
                <SortSelect
                    sortingFunctions={allSortingFunctions}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            {
                spells
                    .filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter(spell => selectedSpellLevel ? spell.level === Number(selectedSpellLevel) : true)
                    .filter(spell => (selectedClass && spell.classes) ? spell.classes.includes(selectedClass) : true)
                    .sort(allSortingFunctions[selectedSort].func)
                    .map(spell => {
                        return <SmallSpellCard
                            spell={spell}
                            getSpells={getSpells}
                            loggedInPlayer={loggedInPlayer}
                            key={spell.id}
                        />
                    })
            }
        </>
    );
};

export default AllSpells;