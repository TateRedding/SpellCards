import React from "react";

const SortSelect = ({ sortingFunctions, selectedSort, setSelectedSort }) => {
    return (
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
    );
};

export default SortSelect;