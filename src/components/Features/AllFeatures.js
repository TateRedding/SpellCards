import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import SmallFeatureCard from "./SmallFeatureCard";
import SortSelect from "../SortSelect";
import { allSortingFunctions } from "../../lists";
import ClassSelect from "../ClassSelect";

const AllFeatures = ({ features, getFeatures, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);
    const [selectedClass, setSelectedClass] = useState('');

    const navigate = useNavigate();

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <button className="btn btn-success mb-3" onClick={() => navigate("/features/new")}>New Feature</button>
                    :
                    null
            }

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="d-flex mb-3">
                <ClassSelect
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
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
                    .filter(feature => (selectedClass && feature.class) ? feature.class === selectedClass : true)
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