import React from "react";
import { useNavigate } from "react-router-dom";

const SmallSpellCard = ({ spell }) => {
    const navigate = useNavigate();

    const deleteSpell = async () => {
        console.log('delete spell');
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