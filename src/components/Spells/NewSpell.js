import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import UnauthorizedMessage from "../UnauthorizedMessage";
import { classes, schools } from "../../lists";

const NewSpell = ({ getSpells, loggedInPlayer }) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState(0);
    const [school, setSchool] = useState('');
    const [castingTime, setCastingTime] = useState('');
    const [range, setRange] = useState('');
    const [verbal, setVerbal] = useState(false);
    const [somatic, setSomatic] = useState(false);
    const [material, setMaterial] = useState(false);
    const [materialComponents, setMaterialComponents] = useState('');
    const [concentration, setConcentration] = useState(false);
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [classList, setClassList] = useState([]);
    const [nameTaken, setNameTaken] = useState(false);
    const [chooseClasses, setChooseClasses] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const createNewSpell = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        setChooseClasses(false);
        if (!classList.length) {
            setChooseClasses(true);
            return;
        };

        const newSpellData = {
            name,
            level,
            school,
            castingTime,
            range,
            verbal,
            somatic,
            material,
            concentration,
            duration,
            description,
            classes: classList
        };

        if (materialComponents) {
            newSpellData.materialComponents = materialComponents;
        };

        try {
            const response = await axios.post("/api/spells", newSpellData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true);
                } else {
                    setName('');
                    setLevel(0);
                    setSchool('');
                    setCastingTime('');
                    setRange('');
                    setVerbal(false);
                    setSomatic(false);
                    setMaterial(false);
                    setMaterialComponents('');
                    setConcentration(false);
                    setDuration('');
                    setDescription('');
                    setClassList([]);
                    getSpells();
                    setSuccess(true);
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    const removeClass = (clsName) => {
        const newList = classList.filter(cls => !(cls === clsName));
        setClassList(newList);
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        };
    }, [success]);

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">New Spell</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <form onSubmit={createNewSpell} autoComplete="off">
                            <div className="form-floating">
                                <input
                                    className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                                    id="spell-name"
                                    aria-labelledby="new-spell-name-taken"
                                    value={name}
                                    required
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="spell-name">Name</label>
                            </div>
                            <div className="form-text mb-3" id="new-spell-name-taken">
                                {
                                    (nameTaken) ?
                                        `Can't use the name ${name}, that spell already exists!` :
                                        null
                                }
                            </div>
                            <div className="form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="spell-level"
                                    aria-labelledby="cantrip-help-text"
                                    value={level}
                                    required
                                    onChange={(event) => setLevel(event.target.value)}
                                />
                                <label htmlFor="spell-level">Level</label>
                            </div>
                            <div className="form-text mb-3" id="cantrip-help-text">
                                Enter 0 for cantrip
                            </div>
                            <div className="d-flex mb-3 flex-wrap" aria-labelledby="new-spell-choose-classes">
                                {
                                    classes.map((cls, idx) => (
                                        <div className="form-check me-3" key={idx}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                onChange={(event) => event.target.checked ? setClassList([...classList, cls.name]) : removeClass(cls.name)}
                                                id={`new-spell-${cls.name}-check`}
                                            />
                                            <label htmlFor={`new-spell-${cls.name}-check`}>
                                                {cls.name}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                (chooseClasses) ?
                                    <div className="form-text text-danger mb-3" id="new-spell-choose-class">
                                        You must choose at least one class!
                                    </div>
                                    :
                                    null
                            }
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="spell-school"
                                    value={school}
                                    required
                                    onChange={(event) => setSchool(event.target.value)}
                                >
                                    <option value="">Choose Option</option>
                                    {
                                        schools.map((schoolName, i) => <option value={schoolName} key={i}>{schoolName}</option>)
                                    }
                                </select>
                                <label htmlFor="spell-school">School</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="spell-casting-time"
                                    value={castingTime}
                                    required
                                    placeholder="Casting Time"
                                    onChange={(event) => setCastingTime(event.target.value)}
                                />
                                <label htmlFor="spell-casting-time">Casting Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="spell-range"
                                    value={range}
                                    required
                                    placeholder="Range"
                                    onChange={(event) => setRange(event.target.value)}
                                />
                                <label htmlFor="spell-range">Range</label>
                            </div>
                            <div className="d-flex mb-3">
                                <div className="form-check me-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="spell-verbal"
                                        checked={verbal}
                                        onChange={(event) => setVerbal(event.target.checked)}
                                    />
                                    <label htmlFor="spell-verbal">Verbal</label>
                                </div>
                                <div className="form-check me-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="spell-somatic"
                                        checked={somatic}
                                        onChange={(event) => setSomatic(event.target.checked)}
                                    />
                                    <label htmlFor="spell-somatic">Somatic</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="spell-material"
                                        checked={material}
                                        onChange={(event) => setMaterial(event.target.checked)}
                                    />
                                    <label htmlFor="spell-material">Material</label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="spell-material-components"
                                    value={materialComponents}
                                    placeholder="Material Components"
                                    onChange={(event) => setMaterialComponents(event.target.value)}
                                />
                                <label htmlFor="spell-material-components">Material Components</label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="spell-concentration"
                                    checked={concentration}
                                    onChange={(event) => setConcentration(event.target.checked)}
                                />
                                <label htmlFor="spell-concentration">Concentration</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="spell-duration"
                                    value={duration}
                                    required
                                    placeholder="Duration"
                                    onChange={(event) => setDuration(event.target.value)}
                                />
                                <label htmlFor="spell-duration">Duration</label>
                            </div>
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="spell-description"
                                    aria-labelledby="new-spell-description-help-text"
                                    style={{ height: "100px" }}
                                    value={description}
                                    required
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="spell-description">Description</label>
                            </div>
                            <div className="form-text mb-3" id="new-spell-description-help-text">
                                Surround text with double asterisks for bold: "**bold text**"
                            </div>
                            <button type="submit" className="btn btn-success mb-3">Add</button>
                        </form>
                        {
                            (success) ?
                                <SuccessCard message={"Successfuly added new spell!"} />
                                :
                                null
                        }
                    </>
                    :
                    <UnauthorizedMessage />
            }
        </>
    );
};

export default NewSpell;