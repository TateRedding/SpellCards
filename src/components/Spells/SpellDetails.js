import React, { useState } from "react";
import axios from "axios";

const SpellDetails = ({ spell, getPlayerData }) => {
    const [removing, setRemoving] = useState(false);

    const componentsArr = [];
    if (spell.verbal) {
        componentsArr.push("V");
    };
    if (spell.somatic) {
        componentsArr.push("S");
    };
    if (spell.material) {
        componentsArr.push("M");
    };
    let componentsString = componentsArr.join(", ");
    if (spell.materialComponents) {
        componentsString = `${componentsString} (${spell.materialComponents})`
    };

    let durationString = "";
    if (spell.concentration) {
        durationString = `Concentration, up to ${spell.duration}`;
    } else {
        durationString = spell.duration;
    };

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
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title">{spell.name}</h5>
                                <button className="btn btn-danger" onClick={() => setRemoving(true)}>Remove</button>
                            </div>
                            <p className="card-text mb-0"><b>Casting Time: </b>{spell.castingTime}</p>
                            <p className="card-text mb-0"><b>Range: </b>{spell.range}</p>
                            <p className="card-text mb-0"><b>Components: </b>{componentsString}</p>
                            <p className="card-text mb-2"><b>Duration: </b>{durationString}</p>
                            <p className="card-text">{spell.description}</p>
                        </div>
                    </div>
            }
        </>
    );
};

export default SpellDetails;