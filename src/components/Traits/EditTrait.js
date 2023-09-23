import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { species } from "../../lists";
import SuccessCard from "../SuccessCard";
import UnauthorizedMessage from "../UnauthorizedMessage";

const EditTrait = ({ getTraits, loggedInPlayer }) => {
    const [trait, setTrait] = useState({});
    const [name, setName] = useState('');
    const [speciesList, setSpeciesList] = useState([]);
    const [subspeciesList, setSubspeciesList] = useState([]);
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [chooseSpecies, setChooseSpecies] = useState(false);
    const [success, setSuccess] = useState(false);

    const { traitId } = useParams();

    const navigate = useNavigate();

    const getTraitData = async () => {
        try {
            const response = await axios.get(`/api/traits/${traitId}`);
            setTrait(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const setValues = () => {
        if (Object.keys(trait).length) {
            setName(trait.name);
            setSpeciesList(trait.species ? trait.species : []);
            setSubspeciesList(trait.subspecies ? trait.subspecies : []);
            setDescription(trait.description);
        };
    };

    const updateTrait = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        setChooseSpecies(false);
        if (!speciesList.length && !subspeciesList.length) {
            setChooseSpecies(true);
            return;
        };
        const updatedTraitData = {
            name,
            description
        };
        if (speciesList.length) updatedTraitData.species = speciesList;
        if (subspeciesList.length) updatedTraitData.subspecies = subspeciesList;

        try {
            const response = await axios.patch(`/api/traits/${traitId}`, updatedTraitData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true);
                } else {
                    getTraitData();
                    setValues();
                    setSuccess(true);
                    getTraits();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getTraitData();
    }, []);

    useEffect(() => {
        setValues();
    }, [trait]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        };
    }, [success]);

    const removeSpecies = (speciesName) => {
        const newList = speciesList.filter(species => !(species === speciesName));
        setSpeciesList(newList);
    };

    const removeSubspecies = (subspeciesName) => {
        const newList = subspeciesList.filter(subspecies => !(subspecies === subspeciesName));
        setSubspeciesList(newList);
    };

    return (
        <>
            {
                loggedInPlayer.isAdmin ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">Edit Trait</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <form onSubmit={updateTrait} autoComplete="off">
                            <div className="form-floating">
                                <input
                                    className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                                    id="edit-trait-name"
                                    aria-labelledby="edit-trait-name-taken"
                                    value={name}
                                    required
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="trait-name">Name</label>
                            </div>
                            <div className="form-text mb-3" id="edit-trait-name-taken">
                                {
                                    (nameTaken) ?
                                        `Can't use the name ${name}, that trait already exists!` :
                                        null
                                }
                            </div>
                            <div className="d-flex mb-3" aria-labelledby="edit-choose-species">
                                {
                                    species.map((species, idx) => (
                                        <div className="me-3" key={idx}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={speciesList ? speciesList.includes(species.name) : false}
                                                    onChange={(event) => event.target.checked ? setSpeciesList([...speciesList, species.name]) : removeSpecies(species.name)}
                                                    id={`edit-trait-${species.name}-check`}
                                                />
                                                <label className="form-check-label" htmlFor={`edit-trait-${species.name}-check`}>
                                                    {species.name}
                                                </label>
                                            </div>
                                            {
                                                species.subspecies.length ?
                                                    <>
                                                        {
                                                            species.subspecies.map((subspecies, idx) => (
                                                                <div className="form-check" key={idx}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={subspeciesList ? subspeciesList.includes(subspecies) : false}
                                                                        onChange={(event) => event.target.checked ? setSubspeciesList([...subspeciesList, subspecies]) : removeSubspecies(subspecies)}
                                                                        id={`edit-trait-${subspecies}-check`}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`edit-trait-${subspecies}-check`}>
                                                                        {subspecies.split(" ")[0]}
                                                                    </label>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    null
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="form-text text-danger mb-3" id="edit-choose-species">
                                {
                                    (chooseSpecies) ?
                                        "You must choose at least one species or subspecies!" :
                                        null
                                }
                            </div>
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="edit-trait-description"
                                    aria-labelledby="edit-trait-description-help-text"
                                    style={{ height: "100px" }}
                                    value={description}
                                    required
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="edit-trait-description">Description</label>
                            </div>
                            <div className="form-text mb-3" id="edit-trait-description-help-text">
                                Surround text with double asterisks for bold: "**bold text**"
                            </div>
                            <button type="submit" className="btn btn-success mb-3">Update</button>
                        </form>
                        {
                            (success) ?
                                <SuccessCard message={`Successfully updated ${trait.name}`} />
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

export default EditTrait;