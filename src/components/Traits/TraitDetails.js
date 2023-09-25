import React from "react";
import { createSpeciesString, formatText } from "../../utils";
import { useNavigate } from "react-router-dom";

const TraitDetails = ({ loggedInPlayer, setDeleting, setRemoving, trait }) => {
    const navigate = useNavigate();

    return (
        <div className="accordion mb-3" id={`trait-accordion-${trait.id}`}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#trait-body-${trait.id}`}>
                        <span className="me-3">{trait.name}</span>
                        <span><i>{createSpeciesString(trait)}</i></span>
                    </button>
                </h2>
                <div id={`trait-body-${trait.id}`} className="accordion-collapse collapse" data-bs-parent={`trait-accordion-${trait.id}`}>
                    <div className="accordion-body">
                        {
                            formatText(trait.description)
                        }
                        {
                            setRemoving ?
                                <button className="btn btn-danger" onClick={() => setRemoving(true)}>Remove</button>
                                :
                                null
                        }
                        {
                            setDeleting && loggedInPlayer.isAdmin ?
                                <>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/traits/edit/${trait.id}`)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => setDeleting(true)}>Delete</button>
                                </>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraitDetails;