import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createComponentsString, createDurationString, createLevelString, formatText } from "../../utils";

const SingleSpell = () => {
    const [spell, setSpell] = useState({});

    const { spellId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getSpellData = async () => {
            try {
                const response = await axios.get(`/api/spells/${spellId}`);
                setSpell(response.data);
            } catch (error) {
                console.error(error);
            };
        };
        getSpellData();
    }, []);

    return (
        <>
            {
                (Object.keys(spell).length) ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">{spell.name}</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <div className="card">
                            <div className="card-body pb-0">
                                <p className="mb-2"><i>{createLevelString(spell)}</i></p>
                                <p className="mb-0"><b>Casting Time: </b>{spell.castingTime}</p>
                                <p className="mb-0"><b>Range: </b>{spell.range}</p>
                                <p className="mb-0"><b>Components: </b>{createComponentsString(spell)}</p>
                                <p className="mb-2"><b>Duration: </b>{createDurationString(spell)}</p>
                                {
                                    formatText(spell.description)
                                }
                            </div>
                        </div>
                    </>
                    :
                    null
            }
        </>
    );
};

export default SingleSpell;