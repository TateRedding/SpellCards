import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditFeature = ({ getFeatures }) => {
    const [feature, setFeature] = useState({});
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [success, setSuccess] = useState(false);

    const { featureId } = useParams();

    const getFeatureData = async () => {
        try {
            const response = await axios.get(`/api/features/${featureId}`);
            setFeature(response.data);
        } catch (error) {
            console.error(error);
        };
    };

    const setValues = () => {
        if (Object.keys(feature).length) {
            setName(feature.name);
            setOrigin(feature.origin);
            setDescription(feature.description);
        };
    };

    const updateFeature = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        const updatedFeatureData = {
            name,
            origin,
            description
        };

        try {
            const response = await axios.patch(`/api/features/${featureId}`, updatedFeatureData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true);
                } else {
                    getFeatureData();
                    setValues();
                    setSuccess(true);
                    getFeatures();
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getFeatureData();
    }, []);

    useEffect(() => {
        setValues();
    }, [feature]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        };
    }, [success]);

    return (
        <>
            <h2>Update Feature</h2>
            <form onSubmit={updateFeature} autoComplete="off">
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
                <button type="submit" className="btn btn-success">Update</button>
            </form>
            {
                (success) ?
                    <p>Successfully updated {feature.name}!</p>
                    :
                    null
            }
        </>
    );
};

export default EditFeature;