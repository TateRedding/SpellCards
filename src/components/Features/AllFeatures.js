import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallFeatureCard from "./SmallFeatureCard";

const AllFeatures = ({ features, getFeatures }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    return (
        <>
            <button className="btn btn-success mb-3" onClick={() => navigate("/features/new")}>New Feature</button>
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="searchInput-features"
                    value={searchTerm}
                    placeholder="Search"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <label htmlFor="searchInput" className="form-label">Search</label>
            </div>
            {
                features
                    .filter(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
                    .map(feature => {
                        return <SmallFeatureCard
                            feature={feature}
                            getFeatures={getFeatures}
                            key={feature.id}
                        />
                    })
            }
        </>
    );
};

export default AllFeatures;