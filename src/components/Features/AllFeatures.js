import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import SmallFeatureCard from "./SmallFeatureCard";
import SortSelect from "../SortSelect";
import { allSortingFunctions } from "../../lists";

const AllFeatures = ({ features, getFeatures, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);

    const navigate = useNavigate();

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <button className="btn btn-success mb-3" onClick={() => navigate("/features/new")}>New Feature</button>
                    :
                    null
            }
            <div className="d-flex align-items-end mb-3">
                <SearchBar
                    className="me-3"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <SortSelect
                    sortingFunctions={allSortingFunctions.slice(0, 2)}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            {
                features
                    .filter(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(allSortingFunctions[selectedSort].func)
                    .map(feature => {
                        return <SmallFeatureCard
                            feature={feature}
                            getFeatures={getFeatures}
                            key={feature.id}
                            loggedInPlayer={loggedInPlayer}
                        />
                    })
            }
        </>
    );
};

export default AllFeatures;