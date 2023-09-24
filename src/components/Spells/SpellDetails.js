import React, { useState } from "react";
import axios from "axios";
import { createClassString, createComponentsString, createDurationString, createLevelString, formatText } from "../../utils";

const SpellDetails = ({ spell, getPlayerData }) => {
    const [removing, setRemoving] = useState(false);

    const removeSpell = async () => {
        try {
            const response = await axios.delete(`/api/player_spells/${spell.playerSpellId}`);
            if (response.data) {
                getPlayerData();
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            {
                (removing) ?
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Are you sure you want to remove {spell.name}?</h5>
                            <div className="d-flex">
                                <button className="btn btn-primary me-2" onClick={() => setRemoving(false)}>No</button>
                                <button className="btn btn-danger" onClick={removeSpell}>Yes</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="accordion mb-3" id={`spell-accordion-${spell.id}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#spell-body-${spell.id}`}>
                                    <span className="me-3">{spell.name}</span>
                                    <span><i>{createLevelString(spell)}</i></span>
                                </button>
                            </h2>
                            <div id={`spell-body-${spell.id}`} className="accordion-collapse collapse" data-bs-parent={`spell-accordion-${spell.id}`}>
                                <div className="accordion-body">
                                    <p className="mb-0"><b>Casting Time: </b>{spell.castingTime}</p>
                                    <p className="mb-0"><b>Range: </b>{spell.range}</p>
                                    <p className="mb-0"><b>Components: </b>{createComponentsString(spell)}</p>
                                    <p className="mb-0"><b>Duration: </b>{createDurationString(spell)}</p>
                                    <p className="mb-2"><b>Classes: </b>{spell.classes ? spell.classes.join(", ") : null}</p>
                                    {
                                        formatText(spell.description)
                                    }
                                    <button className="btn btn-danger" onClick={() => setRemoving(true)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div >
            }
        </>
    );
};

export default SpellDetails;