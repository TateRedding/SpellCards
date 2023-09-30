import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { activePlayers } from "../lists";

const Header = ({ players, loginId, setLoginId, setLoggedInPlayer, TOKEN_NAME }) => {

    const navigate = useNavigate();

    const signOut = () => {
        window.localStorage.removeItem(TOKEN_NAME);
        setLoginId(null);
        setLoggedInPlayer(false);
        navigate("/");
    };

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
                                            if (activePlayers.includes(player.name)) {
                                                return (
                                                    <li className="nav-item" key={player.id}>
                                                        <Link className="nav-link" to={`/${player.urlName.toLowerCase()}`}>
                                                            <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">{player.name}</span>
                                                        </Link>
                                                    </li>
                                                );
                                            };
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
                                <Link className="nav-link" to="/traits">
                                    <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Traits</span>
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
                            {
                                loginId ?
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={() => signOut()}>
                                            <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Sign Out</span>
                                        </button>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signin">
                                            <span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Sign In</span>
                                        </Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;