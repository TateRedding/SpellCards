import React, { useState } from "react";
import axios from "axios";
import { createClassString, formatText } from "../../utils";

const FeatureDetails = ({ feature, getPlayerData }) => {
    const [removing, setRemoving] = useState(false);

    const removeFeature = async () => {
        try {
            const response = await axios.delete(`/api/player_features/${feature.playerFeatureId}`);
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
                            <h5 className="card-title">Are you sure you want to remove {feature.name}?</h5>
                            <div className="d-flex">
                                <button className="btn btn-primary me-2" onClick={() => setRemoving(false)}>No</button>
                                <button className="btn btn-danger" onClick={removeFeature}>Yes</button>
                            </div>
                        </div>
                    </div>
                    :
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
                                    <button className="btn btn-danger" onClick={() => setRemoving(true)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default FeatureDetails;