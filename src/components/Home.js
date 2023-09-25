import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { activePlayers } from "../lists";

const Home = ({ players, loginId, setLoginId, setLoggedInPlayer, TOKEN_NAME }) => {
    const [selectedId, setSelectedId] = useState(0);
    const [pin, setPin] = useState('');
    const [incorrectPin, setIncorrectPin] = useState(false);

    const navigate = useNavigate();

    const signIn = async (event) => {
        event.preventDefault();
        setIncorrectPin(false);
        try {
            const response = await axios.post("/api/players/signin", {
                id: selectedId,
                pin
            });
            if (response.data.name === "IncorrectPIN") {
                setIncorrectPin(true);
            } else {
                setLoginId(selectedId);
                setLoggedInPlayer(response.data);
                window.localStorage.setItem(TOKEN_NAME, selectedId);
                setSelectedId(0);
                setPin('');
            }
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            {
                loginId ?
                    null
                    :
                    <div className="mb-3">
                        <h5 className="text-center">Sign in to add/remove spells and features from your own lists.</h5>
                        <form onSubmit={signIn} autoComplete="off">
                            <select
                                className="form-select mb-3"
                                value={selectedId}
                                onChange={(event) => setSelectedId(event.target.value)}
                            >
                                <option value={0}>Select Your Character</option>
                                {
                                    players.map(player => <option value={player.id} key={player.id}>{player.name}</option>)
                                }
                            </select>
                            {
                                incorrectPin ?
                                    <div className="form-text text-danger">
                                        Incorrect PIN! Try again.
                                    </div>
                                    :
                                    null
                            }
                            <div className="d-flex align-items-center">
                                <label htmlFor="signin-pin" className="form-label mb-0 me-3">PIN</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="signin-pin"
                                    value={pin}
                                    required
                                    onChange={(event) => setPin(event.target.value)}>
                                </input>
                            </div>
                            <div className="form-text mb-3">
                                This will be the last four digits of your phone number.
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
                            </div>
                        </form>
                    </div>
            }
            <h5 className="text-center mb-3">Pick a character to view their spells and features.</h5>
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