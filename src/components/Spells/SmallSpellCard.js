import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SmallSpellCard = ({ spell, getSpells }) => {
    const navigate = useNavigate();

    const deleteSpell = async () => {
        try {
            const response = await axios.delete(`/api/spells/${spell.id}`);
            if (response.data) {
                getSpells();
            };
        } catch (error) {
            console.error(error);
        };
    };

    return(
        <div className="card">
            <h5 className="card-title">{spell.name}</h5>
            <button className="btn btn-primary" onClick={() => navigate(`/spells/edit/${spell.id}`)}>Edit</button>
            <button className="btn btn-danger" onClick={deleteSpell}>Delete</button>
        </div>
    );
};

export default SmallSpellCard;