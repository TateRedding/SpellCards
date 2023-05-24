import React, { useState } from "react";
import axios from "axios";

const NewFeature = ({ getFeatures }) => {
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);

    const createNewFeature = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        const newFeatureData = {
            name,
            origin,
            description
        };

        try {
            const response = await axios.post("/api/features", newFeatureData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true)
                } else {
                    setName('');
                    setOrigin('');
                    setDescription('');
                    getFeatures();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            <h2>New Feature</h2>
            <form onSubmit={createNewFeature} autoComplete="off">
                <div className="form-floating">
                    <input
                        className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                        id="feature-name"
                        aria-labelledby="name-taken"
                        value={name}
                        required
                        placeholder="Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label htmlFor="feature-name">Name</label>
                </div>
                <div className="form-text mb-3" id="name-taken">
                    {
                        (nameTaken) ?
                            `Can't use the name ${name}, that feature already exists!` :
                            null
                    }
                </div>
                <div className="form-floating">
                    <input
                        className="form-control"
                        id="feature-origin"
                        aria-labelledby="origin-help-text"
                        value={origin}
                        required
                        placeholder="Origin"
                        onChange={(event) => setOrigin(event.target.value)}
                    />
                    <label htmlFor="feature-origin">Origin</label>
                </div>
                <div className="form-text mb-3" id="orign-help-text">
                    Species, class, sub-class, feat, etc...
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="feature-description"
                        style={{ height: "100px" }}
                        value={description}
                        required
                        placeholder="Description"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <label htmlFor="feature-description">Description</label>
                </div>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </>
    );
};

export default NewFeature;