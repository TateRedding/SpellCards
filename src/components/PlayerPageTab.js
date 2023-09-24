import React from "react";
import { allSortingFunctions } from "../lists";
import axios from "axios";

const PlayerPageTab = ({
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
    setAlreadyOnList,
    setSelectedId,
    type
}) => {

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
                    <form onSubmit={handleAdd} autoComplete="off">
                        <div className="d-flex">
                            <button className="btn btn-success me-2" type="submit">{`Add ${type[0].toUpperCase() + type.slice(1)}`}</button>
                            <select
                                className={
                                    (alreadyOnList) ?
                                        "form-select is-invalid" :
                                        "form-select"
                                }
                                aria-labelledby={`${type}-on-list-text`}
                                value={selectedId}
                                required
                                onChange={(event) => setSelectedId(event.target.value)}
                            >
                                <option value="">{`Select ${type[0].toUpperCase() + type.slice(1)}`}</option>
                                {
                                    allList
                                        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                                        .map(listItem => <option value={`${listItem.id}`} key={listItem.id}>{listItem.name}</option>)
                                }
                            </select>
                        </div>
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
                    null
            }
        </>
    );
};

export default PlayerPageTab;