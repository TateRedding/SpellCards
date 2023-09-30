import React, { useState } from "react";
import axios from "axios";
import { activePlayers } from "../lists";
import { useNavigate } from "react-router-dom";

const SignIn = ({ players, setLoginId, setLoggedInPlayer, TOKEN_NAME }) => {
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
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="mt-5">
            <form onSubmit={signIn} autoComplete="off">
                <select
                    className="form-select mb-3"
                    value={selectedId}
                    onChange={(event) => setSelectedId(event.target.value)}
                >
                    <option value={0}>Select Your Character</option>
                    {
                        players
                            .filter(player => activePlayers.includes(player.name) || player.isAdmin)
                            .map(player => <option value={player.id} key={player.id}>{player.name}</option>)
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
    );
};

export default SignIn;