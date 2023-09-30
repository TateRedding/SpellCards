import React from "react";
import { useNavigate } from "react-router-dom";
import { activePlayers } from "../lists";

const Home = ({ players }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h5 className="text-center mb-3">Pick a character to view their spells, features, and traits.</h5>
            {
                players.map(player => {
                    if (activePlayers.includes(player.name)) {
                        return (
                            <button
                                className="player-button btn btn-outline-primary mb-3"
                                key={player.id}
                                onClick={() => navigate(`/${player.urlName.toLowerCase()}`)}>{player.name}</button>
                        );
                    };
                })
            }
        </div>
    );
};

export default Home;