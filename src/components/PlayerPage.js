import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerPage = ({ player, allSpells }) => {
    const [tab, setTab] = useState("spells");
    const [playerSpells, setPlayerSpells] = useState([]);
    const [showSpellSelect, setShowSpellSelect] = useState(false);
    const [selectedSpellId, setSelectedSpellId] = useState('');
    const [spellAlreadyOnList, setSpellAlreadyOnList] = useState(false);
    const [playerFeatures, setPlayerFeatures] = useState([]);

    const getPlayerSpells = async () => {
        try {
            const response = await axios.get(`/api/spells/player/${player.id}`);
            setPlayerSpells(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getPlayerFeatures = async () => {
        try {
            const response = await axios.get(`/api/features/player/${player.id}`);
            setPlayerFeatures(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const addSpell = async (event) => {
        event.preventDefault();
        setSpellAlreadyOnList(false);
        try {
            const response = await axios.post("/api/player_spells", {
                playerId: player.id,
                spellId: selectedSpellId
            });
            if (response.data) {
                if (response.data.name === "PlayerSpellAlreadyExists") {
                    setSpellAlreadyOnList(true);
                } else {
                    setSelectedSpellId('');
                    setShowSpellSelect(false);
                    getPlayerSpells();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getPlayerSpells();
        getPlayerFeatures();
    }, []);

    useEffect(() => {
        getPlayerSpells();
        getPlayerFeatures();
    }, [player])

    return (
        <>
            <h2>{player.name}</h2>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={
                            (tab === "spells") ?
                                "nav-link active" :
                                "nav-link"
                        }
                        onClick={() => setTab("spells")}>Spells</button>
                </li>
                <li className="nav-item">
                    <button
                        className={
                            (tab === "features") ?
                                "nav-link active" :
                                "nav-link"
                        }
                        onClick={() => setTab("features")}>Features</button>
                </li>
            </ul>
            {
                (tab === "spells") ?
                    <>
                        <ul>
                            {
                                playerSpells.map(spell => <li key={spell.id}>{spell.name}</li>)
                            }
                        </ul>
                        {
                            (showSpellSelect) ?
                                <form onSubmit={addSpell} autoComplete="off">
                                    <div className="d-flex mb-3">
                                        <button className="btn btn-primary me-2" onClick={() => {
                                            setShowSpellSelect(false);
                                            setSelectedSpellId('');
                                            setSpellAlreadyOnList(false);
                                        }
                                        }>Back</button>
                                        <button className="btn btn-success" type="submit">Confirm Add</button>
                                    </div>
                                    <select
                                        className={
                                            (spellAlreadyOnList) ?
                                                "form-select is-invalid" :
                                                "form-select"
                                        }
                                        aria-labelledby="spell-on-list-text"
                                        value={selectedSpellId}
                                        required
                                        onChange={(event) => setSelectedSpellId(event.target.value)}
                                    >
                                        <option value="">Select Spell</option>
                                        {
                                            allSpells.map(spell => <option value={`${spell.id}`} key={spell.id}>{spell.name}</option>)
                                        }
                                    </select>
                                    <div className="form-text" id="spell-on-list-text">
                                        {
                                            (spellAlreadyOnList) ?
                                                "This spell is already on your list!" :
                                                null
                                        }
                                    </div>
                                </form> :
                                <button className="btn btn-success" onClick={() => setShowSpellSelect(true)}>Add Spell</button>
                        }
                    </> :

                    null
            }
            {
                (tab === "features") ?
                    <ul>
                        {
                            playerFeatures.map(feature => <li key={feature.id}>{feature.name}</li>)
                        }
                    </ul> :
                    null
            }
        </>
    );
};

export default PlayerPage