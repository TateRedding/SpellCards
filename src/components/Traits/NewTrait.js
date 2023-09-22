import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { species } from "../../lists";
import SuccessCard from "../SuccessCard";
import UnauthorizedMessage from "../UnauthorizedMessage";

const NewTrait = ({ getTraits, loggedInPlayer }) => {
    const [name, setName] = useState('');
    const [speciesList, setSpeciesList] = useState([]);
    const [subspeciesList, setSubspeciesList] = useState([]);
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [chooseSpecies, setChooseSpecies] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const createNewTrait = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        setChooseSpecies(false);
        if (!speciesList.length && !subspeciesList.length) {
            setChooseSpecies(true);
            return;
        };

        const newTraitData = {
            name,
            description
        };

        if (speciesList.length) newTraitData.species = speciesList;
        if (subspeciesList.length) newTraitData.subspecies = subspeciesList;

        try {
            const response = await axios.post("/api/traits", newTraitData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true)
                } else {
                    setSuccess(true);
                    setName('');
                    setSpeciesList([]);
                    setSubspeciesList([]);
                    setDescription('');
                    getTraits();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    const removeSpecies = (speciesName) => {
        const newList = speciesList.filter(species => !(species === speciesName));
        setSpeciesList(newList);
    };

    const removeSubspecies = (subspeciesName) => {
        const newList = subspeciesList.filter(subspecies => !(subspecies === subspeciesName));
        setSubspeciesList(newList);
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
                            <h2 className="me-3 mb-0">New Trait</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <form onSubmit={createNewTrait} autoComplete="off">
                            <div className="form-floating">
                                <input
                                    className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                                    id="trait-name"
                                    aria-labelledby="name-taken"
                                    value={name}
                                    required
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="trait-name">Name</label>
                            </div>
                            <div className="form-text mb-3" id="name-taken">
                                {
                                    (nameTaken) ?
                                        `Can't use the name ${name}, that trait already exists!` :
                                        null
                                }
                            </div>
                            <div className="d-flex mb-3" aria-labelledby="choose-species">
                                {
                                    species.map((species, idx) => (
                                        <div className="me-3" key={idx}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    onChange={(event) => event.target.checked ? setSpeciesList([...speciesList, species.name]) : removeSpecies(species.name)}
                                                    id={`${species.name}-check`}
                                                />
                                                <label className="form-check-label" htmlFor={`${species.name}-check`}>
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
                                                                        value=""
                                                                        onChange={(event) => event.target.checked ? setSubspeciesList([...subspeciesList, subspecies]) : removeSubspecies(subspecies)}
                                                                        id={`${subspecies}-check`}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`${subspecies}-check`}>
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
                            <div className="form-text text-danger mb-3" id="choose-species">
                                {
                                    (chooseSpecies) ?
                                        "You must choose at least one species or subspecies!" :
                                        null
                                }
                            </div>
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="trait-description"
                                    aria-labelledby="description-help-text"
                                    style={{ height: "100px" }}
                                    value={description}
                                    required
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="trait-description">Description</label>
                            </div>
                            <div className="form-text mb-3" id="description-help-text">
                                Surround text with double asterisks for bold: "**bold text**"
                            </div>
                            <button type="submit" className="btn btn-success mb-3">Add</button>
                        </form>
                        {
                            (success) ?
                                <SuccessCard message={"Successfully added new trait!"} />
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

export default NewTrait;