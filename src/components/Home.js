import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ players }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h5 className="text-center mb-3">Who are you?</h5>
            {
                players.map(player => <button className="player-button btn btn-outline-primary mb-3" onClick={() => navigate(`/${player.name.toLowerCase()}`)}>{player.name}</button>)
            }
        </div>
    );
};

export default Home;