import React from "react";
import { useNavigate } from "react-router-dom";

const SmallFeatureCard = ({ feature }) => {
    const navigate = useNavigate();

    const deleteFeature = async () => {
        console.log('delete feature');
    };

    return(
        <div className="card">
            <h5 className="card-title">{feature.name}</h5>
            <button className="btn btn-primary" onClick={() => navigate(`/features/edit/${feature.id}`)}>Edit</button>
            <button className="btn btn-danger" onClick={deleteFeature}>Delete</button>
        </div>
    );
};

export default SmallFeatureCard;