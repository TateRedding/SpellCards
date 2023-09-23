import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import UnauthorizedMessage from "../UnauthorizedMessage";

const EditFeature = ({ getFeatures, loggedInPlayer }) => {
    const [feature, setFeature] = useState({});
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [success, setSuccess] = useState(false);

    const { featureId } = useParams();

    const navigate = useNavigate();

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
            {
                loggedInPlayer.isAdmin ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">Update Feature</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <form onSubmit={updateFeature} autoComplete="off">
                            <div className="form-floating">
                                <input
                                    className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                                    id="feature-name"
                                    aria-labelledby="edit-feature-name-taken"
                                    value={name}
                                    required
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="feature-name">Name</label>
                            </div>
                            <div className="form-text mb-3" id="edit-feature-name-taken">
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
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="feature-description"
                                    aria-labelledby="edit-feature-description-help-text"
                                    style={{ height: "100px" }}
                                    value={description}
                                    required
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="feature-description">Description</label>
                            </div>
                            <div className="form-text mb-3" id="edit-feature-description-help-text">
                                Surround text with double asterisks for bold: "**bold text**"
                            </div>
                            <button type="submit" className="btn btn-success">Update</button>
                        </form>
                        {
                            (success) ?
                                <SuccessCard message={`Successfully updated ${feature.name}!`} />
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

export default EditFeature;