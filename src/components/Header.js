import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const getPlayerNames = async () => {
            try {
                const response = await axios.get("/api/players");
                console.log(response.data);
                setPlayers(response.data);
            } catch (error) {
                console.error(error);
            };
        };
        getPlayerNames();
    }, []);

    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-sm bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#playerButtons" aria-controls="playerButtons" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="playerButtons">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            {
                                players.map((player) => {
                                    return (
                                        <li className="nav-item" key={player.id}>
                                            <a className="nav-link" href={`/${player.name}`}>{player.name}</a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;