import React from "react";
import { spellLevels } from "../lists";

const LevelSelect = ({ selectedSpellLevel, setSelectedSpellLevel, maxSpellLevel }) => {
    return (
        <div className="me-3">
            <label htmlFor="level-filter">Level</label>
            <select
                className="form-select"
                id="level-filter"
                value={selectedSpellLevel}
                onChange={(event) => setSelectedSpellLevel(event.target.value)}
            >
                <option value="">All</option>
                <option value={0}>Cantrip</option>
                {
                    spellLevels
                        .slice(0, maxSpellLevel)
                        .map((level, idx) => <option value={level} key={idx}>{level}</option>)
                }
            </select>
        </div>
    );
};

export default LevelSelect;