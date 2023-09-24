import React from "react";
import { species } from "../lists";

const SpeciesSelect = ({ selectedSpecies, setSelectedSpecies }) => {
    return (
        <div className="me-3">
            <label htmlFor="species-filter">Species</label>
            <select
                className="form-select"
                id="species-filter"
                value={selectedSpecies}
                onChange={(event) => setSelectedSpecies(event.target.value)}
            >
                <option value="">All</option>
                {
                    species.map((species, idx) => <option value={species.name} key={idx}>{species.name}</option>)
                }
            </select>
        </div>
    );
};

export default SpeciesSelect