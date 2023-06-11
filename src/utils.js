import React from "react";

export const createComponentsString = (spell) => {
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
    return componentsString;
};

export const createDurationString = (spell) => {
    let durationString = "";
    if (spell.concentration) {
        durationString = `Concentration, up to ${spell.duration}`;
    } else {
        durationString = spell.duration;
    };
    return durationString;
};

export const createLevelString = (spell) => {
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
    return levelString;
};

export const formatText = (text) => {
    const formattedText = text
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
        });
    return formattedText;
};