import React, { useEffect, useState } from "react";
import axios from "axios";

const AllSpells = () => {
    const [spells, setSpells] = useState([]);

    useEffect(() => {
        const getSpells = async () => {
            const response = await axios.get("/api/spells");
            setSpells(response.data);
        };
        getSpells();
    }, []);

    return (
        <ul>
            {
                spells.map(spell => <li>{spell.name}</li>)
            }
        </ul>
    );
};

export default AllSpells;