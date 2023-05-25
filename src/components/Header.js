import React from "react";
import { Link } from "react-router-dom";

const Header = ({ players }) => {

    return (
        <header>
            <nav className="navbar navbar-expand-sm bg-body-tertiary mb-3">
                <div className="container-fluid">
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#playerButtons">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="playerButtons">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            {
                                players.map((player) => {
                                    return (
                                        <li className="nav-item" key={player.id}>
                                            <Link className="nav-link" to={`/${player.name.toLowerCase()}`}>{player.name}</Link>
                                        </li>
                                    );
                                })
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to="/spells">Spells</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/features">Features</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;