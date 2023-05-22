import React, { useEffect, useState } from "react";
import axios from "axios";
import SmallSpellCard from "./SmallSpellCard";

const AllSpells = () => {
    const [spells, setSpells] = useState([]);
    const [filteredSpells, setFilteredSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getSpells = async () => {
            const response = await axios.get("/api/spells");
            setSpells(response.data);
        };
        getSpells();
    }, []);

    useEffect(() => {
        setFilteredSpells(spells);
    }, [spells]);

    useEffect(() => {
        setFilteredSpells(spells.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);

    return (
        <>
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="searchInput"
                    value={searchTerm}
                    placeholder="Search"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <label htmlFor="searchInput" className="form-label">Search</label>
            </div>
            {
                filteredSpells.map(spell => <SmallSpellCard spell={spell} key={spell.id} />)
            }
        </>
    );
};

export default AllSpells;