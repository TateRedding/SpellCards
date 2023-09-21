import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatText } from "../../utils";

const SingleFeature = () => {
    const [feature, setFeature] = useState({});

    const { featureId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getFeatureData = async () => {
            try {
                const response = await axios.get(`/api/features/${featureId}`);
                setFeature(response.data);
            } catch (error) {
                console.error(error);
            };
        };
        getFeatureData();
    }, []);

    return (
        <>
            {
                (Object.keys(feature).length) ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">{feature.name}</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <div className="card">
                            <div className="card-body pb-0">
                                <p className="mb-2"><i>{feature.origin}</i></p>
                                {
                                    formatText(feature.description)
                                }
                            </div>
                        </div>
                    </>
                    :
                    null
            }
        </>
    )

};

export default SingleFeature;