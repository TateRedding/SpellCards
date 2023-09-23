import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createSpeciesString, formatText } from "../../utils";

const SingleTrait = () => {
    const [trait, setTrait] = useState({});

    const { traitId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getTraitData = async () => {
            try {
                const response = await axios.get(`/api/traits/${traitId}`);
                setTrait(response.data);
            } catch (error) {
                console.error(error);
            };
        };
        getTraitData();
    }, []);

    return (
        <>
            {
                (Object.keys(trait).length) ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">{trait.name}</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <div className="card">
                            <div className="card-body pb-0">
                                <p className="mb-2"><i>{createSpeciesString(trait)}</i></p>
                                {
                                    formatText(trait.description)
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

export default SingleTrait;