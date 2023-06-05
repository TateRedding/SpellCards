import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessCard from "../SuccessCard";

const NewQuest = ({ getQuests }) => {
    const [name, setName] = useState('');
    const [giver, setGiver] = useState('');
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const createNewQuest = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        const newQuestData = {
            name,
            giver,
            description
        };

        try {
            const response = await axios.post("/api/quests", newQuestData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true);
                } else {
                    setName('');
                    setGiver('');
                    setDescription('');
                    getQuests();
                    setSuccess(true);
                };
            };
        } catch (error) {
            console.error(error)
        };
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        };
    }, [success]);

    return (
        <>
            <div className="d-flex align-items-center mb-2">
                <h2 className="me-3 mb-0">New Quest</h2>
                <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <form onSubmit={createNewQuest} autoComplete="off">
                <div className="form-floating">
                    <input
                        className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                        id="quest-name"
                        aria-labelledby="name-taken"
                        value={name}
                        required
                        placeholder="Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label htmlFor="quest-name">Name</label>
                </div>
                <div className="form-text mb-3" id="name-taken">
                    {
                        (nameTaken) ?
                            `Can't use the name ${name}, that quest already exists!` :
                            null
                    }
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="quest-giver"
                        value={giver}
                        required
                        placeholder="Quest Giver"
                        onChange={(event) => setGiver(event.target.value)}
                    />
                    <label htmlFor="quest-giver">Quest Giver</label>
                </div>
                <div className="form-floating">
                    <textarea
                        className="form-control"
                        id="quest-description"
                        aria-labelledby="description-help-text"
                        style={{ height: "100px" }}
                        value={description}
                        required
                        placeholder="Description"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <label htmlFor="quest-description">Description</label>
                </div>
                <div className="form-text mb-3" id="description-help-text">
                    Surround text with double asterisks for bold: "**bold text**"
                </div>
                <button type="submit" className="btn btn-success mb-3">Add</button>
            </form>
            {
                (success) ?
                    <SuccessCard message={"Successfully added new quest!"} />
                    :
                    null
            }
        </>
    );
};

export default NewQuest;