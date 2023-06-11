import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SmallSpellCard = ({ spell, getSpells, createLevelString, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const deleteSpell = async () => {
        try {
            const response = await axios.delete(`/api/spells/${spell.id}`);
            if (response.data) {
                setDeleting(false);
                getSpells();
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            {
                (deleting) ?
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Are you sure you want to delete {spell.name}?</h5>
                            <button className="btn btn-primary me-2" onClick={() => setDeleting(false)}>No</button>
                            <button className="btn btn-danger" onClick={deleteSpell}>Yes</button>
                        </div>
                    </div>
                    :
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title me-3">{spell.name}</h5>
                                <p className="card-text"><i>{createLevelString(spell)}</i></p>
                            </div>
                            <button className="btn btn-success btn-sm me-2" onClick={() => navigate(`/spells/${spell.id}`)}>Details</button>
                            {
                                loggedInPlayer.isAdmin ?
                                    <>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/spells/edit/${spell.id}`)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => setDeleting(true)}>Delete</button>
                                    </>
                                    :
                                    null
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default SmallSpellCard;