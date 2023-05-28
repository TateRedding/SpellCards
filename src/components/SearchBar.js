import React from "react";

const SearchBar = ({ className, searchTerm, setSearchTerm }) => {
    return (
        <div className={`${className} form-floating`}>
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