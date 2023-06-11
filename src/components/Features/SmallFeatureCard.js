import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SmallFeatureCard = ({ feature, getFeatures, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

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
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title me-3">{feature.name}</h5>
                                <p className="card-text"><i>{feature.origin}</i></p>
                            </div>
                            <button className="btn btn-success btn-sm me-2" onClick={() => navigate(`/features/${feature.id}`)}>Details</button>
                            {
                                loggedInPlayer.isAdmin ?
                                    <>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/features/edit/${feature.id}`)}>Edit</button>
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

export default SmallFeatureCard;