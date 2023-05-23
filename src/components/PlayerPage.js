import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerPage = ({ player }) => {
    const [tab, setTab] = useState("spells");
    const [spells, setSpells] = useState([]);
    const [features, setFeatures] = useState([]);

    const getSpells = async () => {
        try {
            const response = await axios.get(`/api/spells/player/${player.id}`);
            setSpells(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const getFeatures = async () => {
        try {
            const response = await axios.get(`/api/features/player/${player.id}`);
            setFeatures(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getSpells();
        getFeatures();
    }, []);

    useEffect(() => {
        getSpells();
        getFeatures();
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
                    <ul>
                        {
                            spells.map(spell => <li key={spell.id}>{spell.name}</li>)
                        }
                    </ul> :
                    null
            }
            {
                (tab === "features") ?
                    <ul>
                        {
                            features.map(feature => <li key={feature.id}>{feature.name}</li>)
                        }
                    </ul> :
                    null
            }
        </>
    );
};

export default PlayerPage