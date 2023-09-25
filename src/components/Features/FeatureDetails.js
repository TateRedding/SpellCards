import React from "react";
import { createClassString, formatText } from "../../utils";
import { useNavigate } from "react-router-dom";

const FeatureDetails = ({ feature, loggedInPlayer, setDeleting, setRemoving }) => {
    const navigate = useNavigate();

    return (
        <div className="accordion mb-3" id={`feature-accordion-${feature.id}`}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#feature-body-${feature.id}`}>
                        <span className="me-3">{feature.name}</span>
                        <span><i>{createClassString(feature)}</i></span>
                    </button>
                </h2>
                <div id={`feature-body-${feature.id}`} className="accordion-collapse collapse" data-bs-parent={`feature-accordion-${feature.id}`}>
                    <div className="accordion-body">
                        {
                            formatText(feature.description)
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
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/features/edit/${feature.id}`)}>Edit</button>
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

export default FeatureDetails;