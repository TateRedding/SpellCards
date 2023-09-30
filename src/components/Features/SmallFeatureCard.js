import React, { useState } from "react";
import axios from "axios";
import FeatureDetails from "./FeatureDetails";

const SmallFeatureCard = ({ feature, getFeatures, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const deleteFeature = async () => {
        try {
            const response = await axios.delete(`/api/features/${feature.id}`);
            if (response.data) {
                setDeleting(false);
                getFeatures();
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
                            <h5 className="card-title">Are you sure you want to delete {feature.name}?</h5>
                            <button className="btn btn-primary me-2" onClick={() => setDeleting(false)}>No</button>
                            <button className="btn btn-danger" onClick={deleteFeature}>Yes</button>
                        </div>
                    </div>
                    :
                    <FeatureDetails
                        feature={feature}
                        loggedInPlayer={loggedInPlayer}
                        setDeleting={setDeleting}
                    />
            }
        </>

    );
};

export default SmallFeatureCard;