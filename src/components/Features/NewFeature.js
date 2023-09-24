import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { classes } from "../../lists";
import SuccessCard from "../SuccessCard";
import UnauthorizedMessage from "../UnauthorizedMessage";

const NewFeature = ({ getFeatures, loggedInPlayer }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [subclassList, setSubclassList] = useState([]);
    const [selectedSubclass, setSelectedSubclass] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const createNewFeature = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        const newFeatureData = {
            name,
            class: selectedClass,
            description
        };
        if (selectedSubclass) newFeatureData.subclass = selectedSubclass;

        try {
            const response = await axios.post("/api/features", newFeatureData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true)
                } else {
                    setSuccess(true);
                    setName('');
                    setSelectedClass('');
                    setSelectedSubclass('');
                    setDescription('');
                    getFeatures();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        (selectedClass) ? setSubclassList(classes.filter(cls => cls.name === selectedClass)[0].subclasses) : setSubclassList([]);
    }, [selectedClass]);

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
                            <h2 className="me-3 mb-0">New Feature</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <form onSubmit={createNewFeature} autoComplete="off">
                            <div className="form-floating">
                                <input
                                    className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                                    id="feature-name"
                                    aria-labelledby="new-feature-name-taken"
                                    value={name}
                                    required
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="feature-name">Name</label>
                            </div>
                            <div className="form-text mb-3" id="new-feature-name-taken">
                                {
                                    (nameTaken) ?
                                        `Can't use the name ${name}, that feature already exists!` :
                                        null
                                }
                            </div>
                            <div className=" d-flex mb-3">
                                <div className="form-floating me-3">
                                    <select
                                        className="form-select"
                                        id="new-feature-class-select"
                                        value={selectedClass}
                                        required
                                        onChange={(event) => setSelectedClass(event.target.value)}
                                    >
                                        <option value="">Choose a Class</option>
                                        {
                                            classes.map((cls, idx) => <option value={cls.name} key={idx}>{cls.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="new-feature-class-select">Class</label>
                                </div>
                                {
                                    subclassList.length ?
                                        <div className="form-floating">
                                            <select
                                                className="form-select"
                                                id="new-feature-subclass-select"
                                                value={selectedSubclass}
                                                onChange={(event) => setSelectedSubclass(event.target.value)}
                                            >
                                                <option value="">Choose a Subclass</option>
                                                {
                                                    subclassList.map((subcls, idx) => <option value={subcls} key={idx}>{subcls}</option>)
                                                }
                                            </select>
                                            <label htmlFor="new-feature-subclass-select">Subclass (optional)</label>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="feature-description"
                                    aria-labelledby="new-feature-description-help-text"
                                    style={{ height: "100px" }}
                                    value={description}
                                    required
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="feature-description">Description</label>
                            </div>
                            <div className="form-text mb-3" id="new-feature-description-help-text">
                                Surround text with double asterisks for bold: "**bold text**"
                            </div>
                            <button type="submit" className="btn btn-success mb-3">Add</button>
                        </form>
                        {
                            (success) ?
                                <SuccessCard message={"Successfully added new feature!"} />
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

export default NewFeature;