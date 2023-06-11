import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemCard from "./ItemCard";
import SearchBar from "../SearchBar";
import SortSelect from "../SortSelect";

const AllItems = ({ items, formatText, getItems, sortingFunctions, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);

    const navigate = useNavigate();

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <button className="btn btn-success mb-3" onClick={() => navigate("/items/new")}>New Item</button>
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
                    sortingFunctions={sortingFunctions}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            {
                items
                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(sortingFunctions[selectedSort].func)
                    .map(item => {
                        return <ItemCard
                            item={item}
                            formatText={formatText}
                            getItems={getItems}
                            loggedInPlayer={loggedInPlayer}
                            key={item.id}
                        />
                    })
            }
        </>
    );
};

export default AllItems;