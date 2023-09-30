import React, { useState } from "react";
import { allSortingFunctions } from "../lists";
import axios from "axios";

const PlayerPageTab = ({
    adding,
    allList,
    alreadyOnList,
    getPlayerData,
    loggedInPlayer,
    playerData,
    playerList,
    renderDetails,
    searchTerm,
    selectedId,
    selectedSort,
    selectedSpellLevel,
    setAdding,
    setAlreadyOnList,
    setSelectedId,
    type
}) => {
    const [addSearchTerm, setAddSearchTerm] = useState('');

    const handleFilter = (listItem) => {
        if (listItem.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            if (selectedSpellLevel) {
                return listItem.level === Number(selectedSpellLevel);
            } else {
                return true;
            };
        };
        return false;
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        setAlreadyOnList(false);
        if (!selectedId) {
            setAdding(false);
            return;
        };

        try {
            const newData = {
                playerId: playerData.id
            };
            const keyName = `${type}Id`;
            newData[keyName] = selectedId;
            const response = await axios.post(`/api/player_${type}s`, newData);
            if (response.data) {
                if (response.data.name === `Player${type[0].toUpperCase() + type.slice(1)}AlreadyExists`) {
                    setAlreadyOnList(true);
                } else {
                    setAdding(false);
                    setSelectedId('');
                    getPlayerData();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            <div>
                {
                    playerList ?
                        playerList
                            .filter(listItem => handleFilter(listItem))
                            .sort(allSortingFunctions[selectedSort].func)
                            .map(listItem => renderDetails(listItem))
                        :
                        null
                }
            </div>
            {
                loggedInPlayer.id === playerData.id || loggedInPlayer.isAdmin ?
                    adding ?
                        <form onSubmit={handleAdd} autoComplete="off">
                            <div className="d-flex mb-2 align-items-center">
                                <button className="btn btn-success me-2" type="submit">Confirm</button>
                                <span>Selected {type}: {selectedId ? allList.find(listItem => listItem.id === Number(selectedId)).name : "None"}</span>
                            </div>
                            <input
                                className="form-control mb-2"
                                value={addSearchTerm}
                                placeholder="Search"
                                onChange={(event) => setAddSearchTerm(event.target.value)}
                            />
                            <select
                                className={
                                    (alreadyOnList) ?
                                        "form-select is-invalid" :
                                        "form-select"
                                }
                                size="7"
                                aria-labelledby={`${type}-on-list-text`}
                                value={selectedId}
                                required
                                onChange={(event) => setSelectedId(event.target.value)}
                            >
                                <option value="">None</option>
                                {
                                    allList
                                        .filter(listItem => listItem.name.toLowerCase().includes(addSearchTerm.toLowerCase()))
                                        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                                        .map(listItem => <option value={`${listItem.id}`} key={listItem.id}>{listItem.name}</option>)
                                }
                            </select>
                            <div className="form-text" id={`${type}-on-list-text`}>
                                {
                                    (alreadyOnList) ?
                                        `This ${type} is already on your list!`
                                        :
                                        null
                                }
                            </div>
                        </form>
                        :
                        <button className="btn btn-success" onClick={() => setAdding(true)}>{`Add ${type[0].toUpperCase() + type.slice(1)}`}</button>
                    :
                    null
            }
        </>
    );
};

export default PlayerPageTab;