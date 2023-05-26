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

    let levelString = "";
    if (spell.level === 0) {
        levelString = "Cantrip, ";
    } else {
        levelString = `${spell.level}`;
        if (spell.level === 1) {
            levelString += "st"
        } else if (spell.level === 2) {
            levelString += "nd"
        } else if (spell.level === 3) {
            levelString += "rd"
        } else {
            levelString += "th"
        }
        levelString += " level ";
    }
    levelString += spell.school.toLowerCase();

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
                    <div className="accordion mb-3" id={`spell-accordion-${spell.id}`}>
                        <div className="accordion-item">
                            <div className="d-flex justify-content-between">
                                <h5 className="accordion-header">
                                    <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#spell-body-${spell.id}`}>{spell.name}</button>
                                </h5>
                                <button className="btn btn-danger m-1" onClick={() => setRemoving(true)}>Remove</button>
                            </div>
                            <div id={`spell-body-${spell.id}`} className="accordion-collapse collapse" data-bs-parent={`spell-accordion-${spell.id}`}>
                                <div className="accordion-body">
                                    <p className="mb-2"><i>{levelString}</i></p>
                                    <p className="mb-0"><b>Casting Time: </b>{spell.castingTime}</p>
                                    <p className="mb-0"><b>Range: </b>{spell.range}</p>
                                    <p className="mb-0"><b>Components: </b>{componentsString}</p>
                                    <p className="mb-2"><b>Duration: </b>{durationString}</p>
                                    {
                                        spell.description
                                            .split('\n')
                                            .map((paragraph, idx) => {
                                                return <p key={idx}>{
                                                    paragraph
                                                        .split('**')
                                                        .map((segment, idx) => {
                                                            if (idx % 2) {
                                                                if (idx === paragraph.split('**').length - 1) {
                                                                    return `**${segment}`
                                                                } else {
                                                                    return <b key={idx}>{segment}</b>
                                                                };
                                                            } else {
                                                                return segment
                                                            };
                                                        })
                                                }</p>
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div >
            }
        </>
    );
};

export default SpellDetails;