import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import SmallTraitCard from "./SmallTraitCard";
import SortSelect from "../SortSelect";
import { allSortingFunctions } from "../../lists";
import SpeciesSelect from "../SpeciesSelect";

const AllTraits = ({ traits, getTraits, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);
    const [selectedSpecies, setSelectedSpecies] = useState('');

    const navigate = useNavigate();

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <button className="btn btn-success mb-3" onClick={() => navigate("/traits/new")}>New Trait</button>
                    :
                    null
            }

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="d-flex mb-3">
                <SpeciesSelect
                    selectedSpecies={selectedSpecies}
                    setSelectedSpecies={setSelectedSpecies}
                />
                <SortSelect
                    sortingFunctions={allSortingFunctions.slice(0, 2)}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            {
                traits
                    .filter(trait => trait.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter(trait => (selectedSpecies && trait.species) ? trait.species.includes(selectedSpecies) : true)
                    .sort(allSortingFunctions[selectedSort].func)
                    .map(trait => {
                        return <SmallTraitCard
                            trait={trait}
                            getTraits={getTraits}
                            key={trait.id}
                            loggedInPlayer={loggedInPlayer}
                        />
                    })
            }
        </>
    );
};

export default AllTraits;