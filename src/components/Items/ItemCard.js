import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatText } from "../../utils";

const ItemCard = ({ item, getItems, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const createItemDescriptorsStrings = () => {
        let itemDescriptorsString = `${item.category[0].toUpperCase()}${item.category.slice(1)}`;
        if (item.categoryDetails) {
            itemDescriptorsString += ` (${item.categoryDetails})`
        };
        itemDescriptorsString += `, ${item.rarity}`;
        if (item.requiresAttunement) {
            itemDescriptorsString += " (requires attunement";
            if (item.attunementRequirements) {
                itemDescriptorsString += ` by ${item.attunementRequirements})`;
            } else {
                itemDescriptorsString += ")"
            };
        };
        return itemDescriptorsString;
    };

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`/api/items/${item.id}`);
            if (response.data) {
                setDeleting(false);
                getItems();
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
                            <h5 className="card-title">Are you sure you want to delete {item.name}?</h5>
                            <button className="btn btn-primary me-2" onClick={() => setDeleting(false)}>No</button>
                            <button className="btn btn-danger" onClick={deleteItem}>Yes</button>
                        </div>
                    </div>
                    :
                    <div className="accordion mb-3" id={`item-accordian-${item.id}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#item-body-${item.id}`}>
                                    {item.name}
                                </button>
                            </h2>
                            <div id={`item-body-${item.id}`} className="accordion-collapse collapse" data-bs-parent={`item-accordion-${item.id}`}>
                                <div className={loggedInPlayer.isAdmin ? "accordion-body" : "accordion-body pb-0"}>
                                    <p><i>{createItemDescriptorsStrings(item)}</i></p>
                                    {
                                        formatText(item.description)
                                    }
                                    {
                                        loggedInPlayer.isAdmin ?
                                            <>
                                                <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/items/edit/${item.id}`)}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => setDeleting(true)}>Delete</button>
                                            </>
                                            :
                                            null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
};

export default ItemCard;