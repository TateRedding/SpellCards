import React, { useEffect, useState } from "react";
import axios from "axios";
import SmallFeatureCard from "./SmallFeatureCard";

const AllFeatures = () => {
    const [features, setFeatures] = useState([]);
    const [filteredFeatures, setFilteredFeatures] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getFeatures = async () => {
            const response = await axios.get("/api/features");
            setFeatures(response.data);
        };
        getFeatures();
    }, []);

    useEffect(() => {
        setFilteredFeatures(features);
    }, [features]);

    useEffect(() => {
        setFilteredFeatures(features.filter(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm]);

    return (
        <>
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
                filteredFeatures.map(feature => <SmallFeatureCard feature={feature} key={feature.id} />)
            }
        </>
    );
};

export default AllFeatures;