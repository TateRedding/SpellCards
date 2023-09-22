import React from "react";
import { classes } from "../lists";

const ClassSelect = ({ selectedClass, setSelectedClass }) => {
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
                    classes.map((cls, idx) => <option value={cls.name} key={idx}>{cls.name}</option>)
                }
            </select>
        </div>
    );
};

export default ClassSelect