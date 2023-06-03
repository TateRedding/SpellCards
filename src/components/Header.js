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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                    Players
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        players.map((player) => {
                                            return (
                                                <li className="nav-item" key={player.id}>
                                                    <Link className="nav-link" to={`/${player.name.toLowerCase()}`}>
                                                        <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">{player.name}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/spells">
                                    <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Spells</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/features">
                                    <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Features</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items">
                                    <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Items</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/quests">
                                    <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Quests</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;