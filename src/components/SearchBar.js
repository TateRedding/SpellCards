import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="form-floating mb-3">
            <input
                className="form-control"
                id="searchInput-spells"
                value={searchTerm}
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <label htmlFor="searchInput" className="form-label">Search</label>
        </div>
    );
};

export default SearchBar;