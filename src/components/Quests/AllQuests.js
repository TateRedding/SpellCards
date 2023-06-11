import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuestCard from "./QuestCard";
import SearchBar from "../SearchBar";
import SortSelect from "../SortSelect";

const AllQuests = ({ quests, formatText, getQuests, sortingFunctions, loggedInPlayer }) => {
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
                quests
                    .filter(quest => quest.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort(sortingFunctions[selectedSort].func)
                    .map(quest => {
                        return <QuestCard
                            quest={quest}
                            formatText={formatText}
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