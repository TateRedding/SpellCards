import React, { useState } from "react";
import axios from "axios";
import SpellDetails from "./SpellDetails";

const SmallSpellCard = ({ spell, getSpells, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const deleteSpell = async () => {
        try {
            const response = await axios.delete(`/api/spells/${spell.id}`);
            if (response.data) {
                setDeleting(false);
                getSpells();
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
                            <h5 className="card-title">Are you sure you want to delete {spell.name}?</h5>
                            <button className="btn btn-primary me-2" onClick={() => setDeleting(false)}>No</button>
                            <button className="btn btn-danger" onClick={deleteSpell}>Yes</button>
                        </div>
                    </div>
                    :
                    <SpellDetails
                        loggedInPlayer={loggedInPlayer}
                        setDeleting={setDeleting}
                        spell={spell}
                    />
            }
        </>
    );
};

export default SmallSpellCard;