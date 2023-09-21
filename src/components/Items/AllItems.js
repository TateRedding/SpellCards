import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import SearchBar from "../SearchBar";
import SortSelect from "../SortSelect";
import { allSortingFunctions } from "../../lists";

const AllItems = ({ items, getItems, loggedInPlayer }) => {
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
                    sortingFunctions={allSortingFunctions.slice(0, 2)}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            {
                items
                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(allSortingFunctions[selectedSort].func)
                    .map(item => {
                        return <ItemCard
                            item={item}
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