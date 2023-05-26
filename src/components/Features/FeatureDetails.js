import React, { useState } from "react";
import axios from "axios";

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
                            <div className="d-flex justify-content-between">
                                <h5 className="accordion-header">
                                    <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#feature-body-${feature.id}`}>{feature.name}</button>
                                </h5>
                                <button className="btn btn-danger m-1" onClick={() => setRemoving(true)}>Remove</button>
                            </div>
                            <div id={`feature-body-${feature.id}`} className="accordion-collapse collapse" data-bs-parent={`feature-accordion-${feature.id}`}>
                                <div className="accordion-body">
                                    <p className="mb-0"><b>Origin: </b>{feature.origin}</p>
                                    {
                                        feature.description
                                            .split('\n')
                                            .map((paragraph, idx) => {
                                                return <p key={idx}>{
                                                    paragraph
                                                        .split('**')
                                                        .map((segment, idx) => {
                                                            if (idx % 2) {
                                                                if (idx === paragraph.split('**').length - 1) {
                                                                    return `**${segment}`
                                                                } else {
                                                                    return <b key={idx}>{segment}</b>
                                                                };
                                                            } else {
                                                                return segment
                                                            };
                                                        })
                                                }</p>
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default FeatureDetails;