import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createSpeciesString } from "../../utils";

const SmallTraitCard = ({ trait, getTraits, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const deleteTrait = async () => {
        try {
            const response = await axios.delete(`/api/traits/${trait.id}`);
            if (response.data) {
                setDeleting(false);
                getTraits();
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            {
                (deleting) ?
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Are you sure you want to delete {trait.name}?</h5>
                            <button className="btn btn-primary me-2" onClick={() => setDeleting(false)}>No</button>
                            <button className="btn btn-danger" onClick={deleteTrait}>Yes</button>
                        </div>
                    </div>
                    :
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{trait.name}</h5>
                                    <p className={`card-text ${loggedInPlayer.isAdmin ? "mb-1" : ""}`}><i>{createSpeciesString(trait)}</i></p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-dark btn-lg" onClick={() => navigate(`/traits/${trait.id}`)}>Details</button>
                                </div>
                            </div>
                            {
                                loggedInPlayer.isAdmin ?
                                    <>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/traits/edit/${trait.id}`)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => setDeleting(true)}>Delete</button>
                                    </>
                                    :
                                    null
                            }
                        </div>
                    </div>
            }
        </>

    );
};

export default SmallTraitCard;