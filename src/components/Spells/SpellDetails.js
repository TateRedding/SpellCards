import React from "react";

const SpellDetails = ({ spell }) => {
    const componentsArr = [];
    if (spell.verbal) {
        componentsArr.push("V")
    };
    if(spell.somatic) {
        componentsArr.push("S");
    };
    if(spell.material) {
        componentsArr.push("M");
    };
    let componentsString = componentsArr.join(", ");
    if(spell.materialComponents) {
        componentsString = `${componentsString} (${spell.materialComponents})`
    };

    let durationString = "";
    if (spell.concentration) {
        durationString = `Concentration, up to ${spell.duration}`;
    } else {
        durationString = spell.duration;
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{spell.name}</h5>
                <p className="card-text mb-0"><b>Casting Time: </b>{spell.castingTime}</p>
                <p className="card-text mb-0"><b>Range: </b>{spell.range}</p>
                <p className="card-text mb-0"><b>Components: </b>{componentsString}</p>
                <p className="card-text mb-2"><b>Duration: </b>{durationString}</p>
                <p className="card-text">{spell.description}</p>
            </div>
        </div>
    );
};

export default SpellDetails;