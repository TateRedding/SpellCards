import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestCard from "./QuestCard";
import SearchBar from "../SearchBar";
import SortSelect from "../SortSelect";
import { allSortingFunctions } from "../../lists";

const AllQuests = ({ quests, getQuests, loggedInPlayer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);

    const navigate = useNavigate();

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <button className="btn btn-success mb-3" onClick={() => navigate("/quests/new")}>New Quest</button>
                    :
                    null
            }
            <SearchBar
                className="me-3"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="d-flex mb-3">
                <SortSelect
                    sortingFunctions={allSortingFunctions.slice(0, 2)}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            {
                quests
                    .filter(quest => quest.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(allSortingFunctions[selectedSort].func)
                    .map(quest => {
                        return <QuestCard
                            quest={quest}
                            getQuests={getQuests}
                            loggedInPlayer={loggedInPlayer}
                            key={quest.id}
                        />
                    })
            }
        </>
    );
};

export default AllQuests;