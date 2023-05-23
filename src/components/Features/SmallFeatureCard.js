import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SmallFeatureCard = ({ feature, getFeatures }) => {
    const navigate = useNavigate();

    const deleteFeature = async () => {
        try {
            const response = await axios.delete(`/api/features/${feature.id}`);
            console.log(response.data);
            if (response.data) {
                getFeatures();
            };
        } catch (error) {
            console.error(error);
        };
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