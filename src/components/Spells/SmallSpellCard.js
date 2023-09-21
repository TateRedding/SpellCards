import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createLevelString } from "../../utils";

const SmallSpellCard = ({ spell, getSpells, loggedInPlayer }) => {
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
                    <div className="link-card card mb-3" onClick={() => navigate(`/spells/${spell.id}`)}>
                        <div className="card-body">
                            <div>
                                <h5 className="card-title">{spell.name}</h5>
                                <p className="card-text mb-0"><i>{createLevelString(spell)}</i></p>
                                <p className={`card-text ${loggedInPlayer.isAdmin ? "mb-1" : ""}`}>{spell.classes ? spell.classes.join(", ") : null}</p>
                            </div>
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