import React from "react";

const ClassSelect = ({ selectedClass, setSelectedClass }) => {
    const classes = [
        "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard"
    ];

    return (
        <div className="me-3">
            <label htmlFor="class-filter">Class</label>
            <select
                className="form-select"
                id="class-filter"
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
            >
                <option value="">All</option>
                {
                    classes.map((cls, idx) => <option value={cls} key={idx}>{cls}</option>)
                }
            </select>
        </div>
    );
};

export default ClassSelect