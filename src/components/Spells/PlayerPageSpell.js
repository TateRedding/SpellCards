import React, { useState } from "react";
import axios from "axios";
import SpellDetails from "./SpellDetails";

const PlayerPageSpell = ({ getPlayerData, loggedInPlayer, spell }) => {
    const [removing, setRemoving] = useState(false);

    const removeSpell = async () => {
        try {
            const response = await axios.delete(`/api/player_spells/${spell.playerSpellId}`);
            if (response.data) {
                getPlayerData();
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            {
                (removing) ?
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Are you sure you want to remove {spell.name}?</h5>
                            <div className="d-flex">
                                <button className="btn btn-primary me-2" onClick={() => setRemoving(false)}>No</button>
                                <button className="btn btn-danger" onClick={removeSpell}>Yes</button>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <SpellDetails
                            loggedInPlayer={loggedInPlayer}
                            setRemoving={setRemoving}
                            spell={spell}
                        />
                    </>
            }
        </>
    );
};

export default PlayerPageSpell;