import React, { useState } from "react";
import axios from "axios";
import TraitDetails from "./TraitDetails";

const SmallTraitCard = ({ trait, getTraits, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

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
                    <TraitDetails
                        loggedInPlayer={loggedInPlayer}
                        setDeleting={setDeleting}
                        trait={trait}
                    />
            }
        </>

    );
};

export default SmallTraitCard;