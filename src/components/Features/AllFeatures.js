import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallFeatureCard from "./SmallFeatureCard";
import SearchBar from "../SearchBar";

const AllFeatures = ({ features, getFeatures, sortingFunctions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);

    const navigate = useNavigate();

    return (
        <>
            <button className="btn btn-success mb-3" onClick={() => navigate("/features/new")}>New Feature</button>
            <div className="d-flex align-items-end mb-3">
                <SearchBar className="me-3" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div>
                    <label htmlFor="sort-select">Order: </label>
                    <select
                        className="form-select"
                        id="sort-select"
                        value={selectedSort}
                        onChange={(event) => setSelectedSort(event.target.value)}
                    >
                        {
                            sortingFunctions.map((sort, idx) => <option value={idx} key={idx}>{sort.name}</option>)
                        }
                    </select>
                </div>
            </div>
            {
                features
                    .filter(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(sortingFunctions[selectedSort].func)
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