import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessCard from "../SuccessCard";
import UnauthorizedMessage from "../UnauthorizedMessage";
import { rarities } from "../../lists";

const NewItem = ({ itemCategories, getItems, loggedInPlayer }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoryDetails, setCategoryDetails] = useState('');
    const [rarity, setRarity] = useState('');
    const [requiresAttunement, setRequiresAttunement] = useState(false);
    const [attunementRequirements, setAttunementRequirements] = useState('');
    const [description, setDescription] = useState('');
    const [nameTaken, setNameTaken] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const createNewItem = async (event) => {
        event.preventDefault();
        setNameTaken(false);
        const newItemData = {
            name,
            category,
            rarity,
            requiresAttunement,
            description
        };

        if (categoryDetails) {
            newItemData.categoryDetails = categoryDetails;
        };

        if (attunementRequirements) {
            newItemData.attunementRequirements = attunementRequirements;
        };

        try {
            const response = await axios.post("/api/items", newItemData);
            if (response.data) {
                if (response.data.name === "NameTakenError") {
                    setNameTaken(true);
                } else {
                    setName('');
                    setCategory('');
                    setCategoryDetails('');
                    setRarity('');
                    setRequiresAttunement(false);
                    setAttunementRequirements('');
                    setDescription('');
                    getItems();
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
            {
                loggedInPlayer.isAdmin ?
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <h2 className="me-3 mb-0">New Item</h2>
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <form onSubmit={createNewItem} autoComplete="off">
                            <div className="form-floating">
                                <input
                                    className={(nameTaken) ? "form-control is-invalid" : "form-control"}
                                    id="item-name"
                                    aria-labelledby="name-taken"
                                    value={name}
                                    required
                                    placeholder="Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="item-name">Name</label>
                            </div>
                            <div className="form-text mb-3" id="name-taken">
                                {
                                    (nameTaken) ?
                                        `Can't use the name ${name}, that item already exists!` :
                                        null
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="item-category"
                                    value={category}
                                    required
                                    onChange={(event) => setCategory(event.target.value)}
                                >
                                    <option value="">Choose Option</option>
                                    {
                                        itemCategories.map((itemCategory, i) => <option value={itemCategory} key={i}>{itemCategory}</option>)
                                    }
                                </select>
                                <label htmlFor="item-category">Category</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    id="item-category-details"
                                    aria-labelledby="item-category-details-help"
                                    value={categoryDetails}
                                    placeholder="Category Details"
                                    onChange={(event) => setCategoryDetails(event.target.value)}
                                />
                                <label htmlFor="item-category-details">Category Details</label>
                            </div>
                            <div className="form-text mb-3" id="item-category-details-help">
                                This is usually a weapon or armor type
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="item-rarity"
                                    value={rarity}
                                    required
                                    onChange={(event) => setRarity(event.target.value)}
                                >
                                    <option value="">Choose Option</option>
                                    {
                                        rarities.map((rarity, i) => <option value={rarity} key={i}>{rarity}</option>)
                                    }
                                </select>
                                <label htmlFor="item-rarity">Rarity</label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="item-attunement"
                                    checked={requiresAttunement}
                                    onChange={(event) => setRequiresAttunement(event.target.checked)}
                                />
                                <label htmlFor="item-attunement">Requires Attunement</label>
                            </div>
                            {
                                requiresAttunement ?
                                    <>
                                        <div className="form-floating">
                                            <input
                                                className="form-control"
                                                id="item-attunement-requirements"
                                                aria-labelledby="item-attunement-requirements-help"
                                                value={attunementRequirements}
                                                placeholder="Attunement Requirements"
                                                onChange={(event) => setAttunementRequirements(event.target.value)}
                                            />
                                            <label htmlFor="item-attunement-requirements">Attunement Requirements</label>
                                        </div>
                                        <div className="form-text mb-3" id="item-category-details-help">
                                            If attunement requires a specific class or species.
                                        </div>
                                    </>
                                    :
                                    null
                            }
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="item-description"
                                    aria-labelledby="description-help-text"
                                    style={{ height: "100px" }}
                                    value={description}
                                    required
                                    placeholder="Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="item-description">Description</label>
                            </div>
                            <div className="form-text mb-3" id="description-help-text">
                                Surround text with double asterisks for bold: "**bold text**"
                            </div>
                            <button type="submit" className="btn btn-success mb-3">Add</button>
                        </form>
                        {
                            (success) ?
                                <SuccessCard message={"Successfully added new item!"} />
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

export default NewItem;