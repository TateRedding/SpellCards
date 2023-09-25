import React, { useState } from "react";
import axios from "axios";
import TraitDetails from "./TraitDetails";

const PlayerPageTrait = ({ trait, getPlayerData, loggedInPlayer }) => {
    const [removing, setRemoving] = useState(false);

    const removeTrait = async () => {
        try {
            const response = await axios.delete(`/api/player_traits/${trait.playerTraitId}`);
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
                            <h5 className="card-title">Are you sure you want to remove {trait.name}?</h5>
                            <div className="d-flex">
                                <button className="btn btn-primary me-2" onClick={() => setRemoving(false)}>No</button>
                                <button className="btn btn-danger" onClick={removeTrait}>Yes</button>
                            </div>
                        </div>
                    </div>
                    :
                    <TraitDetails
                        loggedInPlayer={loggedInPlayer}
                        setRemoving={setRemoving}
                        trait={trait}
                    />
            }
        </>

    );
};

export default PlayerPageTrait;