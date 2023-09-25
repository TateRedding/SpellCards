import React, { useState } from "react";
import axios from "axios";
import FeatureDetails from "./FeatureDetails";

const PlayerPageFeatures = ({ feature, getPlayerData, loggedInPlayer }) => {
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
                    <FeatureDetails
                        feature={feature}
                        loggedInPlayer={loggedInPlayer}
                        setRemoving={setRemoving}
                    />
            }
        </>

    );
};

export default PlayerPageFeatures;