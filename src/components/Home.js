import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ players }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h5 className="text-center mb-3">Who are you?</h5>
            {
                players.map(player => {
                    return (
                        <button
                            className="player-button btn btn-outline-primary mb-3"
                            key={player.id}
                            onClick={() => navigate(`/${player.shortName.toLowerCase()}`)}>{player.name}</button>
                    )
                })
            }
        </div>
    );
};

export default Home;