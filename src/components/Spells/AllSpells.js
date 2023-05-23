import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SmallSpellCard from "./SmallSpellCard";

const AllSpells = ({ spells, getSpells }) => {
    const [filteredSpells, setFilteredSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredSpells(spells);
    }, [spells]);

    useEffect(() => {
        setFilteredSpells(spells.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);

    return (
        <>
            <button className="btn btn-success mb-3" onClick={() => navigate("/spells/new")}>New Spell</button>
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="searchInput-spells"
                    value={searchTerm}
                    placeholder="Search"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <label htmlFor="searchInput" className="form-label">Search</label>
            </div>
            {
                filteredSpells.map(spell => {
                    return <SmallSpellCard
                        spell={spell}
                        getSpells={getSpells}
                        key={spell.id}
                    />
                })
            }
        </>
    );
};

export default AllSpells;