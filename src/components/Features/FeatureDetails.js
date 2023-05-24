import React, { useState } from "react";

const FeatureDetails = ({ feature, getPlayerFeatures }) => {
    const [removing, setRemoving] = useState(false);

    const removeFeature = async () => {
        console.log("remove feature");
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
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title">{feature.name}</h5>
                                <button className="btn btn-danger" onClick={() => setRemoving(true)}>Remove</button>
                            </div>
                            <p className="card-text mb-0"><b>Origin: </b>{feature.origin}</p>
                            <p className="card-text">{feature.description}</p>
                        </div>
                    </div>
            }
        </>

    );
};

export default FeatureDetails;