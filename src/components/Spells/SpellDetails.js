import React from "react";
import { canUserRemove, createComponentsString, createDurationString, createLevelString, formatText } from "../../utils";
import { useNavigate } from "react-router-dom";

const SpellDetails = ({ loggedInPlayer, setDeleting, setRemoving, spell }) => {
    const navigate = useNavigate();

    return (
        <div className="accordion mb-3" id={`spell-accordion-${spell.id}`}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#spell-body-${spell.id}`}>
                        <span className="me-3">{spell.name}</span>
                        <span className="me-3"><i>{createLevelString(spell)}</i></span>
                        <span>{spell.classes ? spell.classes.join(", ") : null}</span>
                    </button>
                </h2>
                <div id={`spell-body-${spell.id}`} className="accordion-collapse collapse" data-bs-parent={`spell-accordion-${spell.id}`}>
                    <div className="accordion-body">
                        <p className="mb-0"><b>Casting Time: </b>{spell.castingTime}</p>
                        <p className="mb-0"><b>Range: </b>{spell.range}</p>
                        <p className="mb-0"><b>Components: </b>{createComponentsString(spell)}</p>
                        <p className="mb-0"><b>Duration: </b>{createDurationString(spell)}</p>
                        {
                            formatText(spell.description)
                        }
                        {
                            setRemoving && canUserRemove(loggedInPlayer) ?
                                <button className="btn btn-danger" onClick={() => setRemoving(true)}>Remove</button>
                                :
                                null
                        }
                        {
                            setDeleting && loggedInPlayer.isAdmin ?
                                <div className="mt-2">
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/spells/edit/${spell.id}`)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => setDeleting(true)}>Delete</button>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SpellDetails;