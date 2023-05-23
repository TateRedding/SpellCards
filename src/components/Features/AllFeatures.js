import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallFeatureCard from "./SmallFeatureCard";

const AllFeatures = ({ features, getFeatures }) => {
    const [filteredFeatures, setFilteredFeatures] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredFeatures(features);
    }, [features]);

    useEffect(() => {
        setFilteredFeatures(features.filter(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);

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
                filteredFeatures.map(feature => {
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