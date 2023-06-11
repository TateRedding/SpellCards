import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuestCard = ({ quest, getQuests, formatText, loggedInPlayer }) => {
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const deleteQuest = async () => {
        try {
            const response = await axios.delete(`/api/quests/${quest.id}`);
            if (response.data) {
                setDeleting(false);
                getQuests();
            };
        } catch (error) {
            console.error(error);
        };
    };

    const toggleCompleted = async () => {
        try {
            const response = await axios.patch(`/api/quests/${quest.id}`,
                {
                    completed: !quest.completed
                });
            if (response.data) {
                getQuests();
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
                            <h5 className="card-title">Are you sure you want to delete {quest.name}?</h5>
                            <button className="btn btn-primary me-2" onClick={() => setDeleting(false)}>No</button>
                            <button className="btn btn-danger" onClick={deleteQuest}>Yes</button>
                        </div>
                    </div>
                    :
                    <div className="accordion mb-3" id={`quest-accordian-${quest.id}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#quest-body-${quest.id}`}>
                                    {
                                        quest.completed ?
                                            <>
                                                <span className="me-3 text-decoration-line-through">{quest.name}</span>
                                                <span className="me-3"><i>{quest.giver}</i></span>
                                                <span><b>COMPLETED</b></span>
                                            </>
                                            :
                                            <>
                                                <span className="me-3">{quest.name}</span>
                                                <span><i>{quest.giver}</i></span>
                                            </>
                                    }


                                </button>
                            </h2>
                            <div id={`quest-body-${quest.id}`} className="accordion-collapse collapse" data-bs-parent={`quest-accordion-${quest.id}`}>
                                <div className={loggedInPlayer.isAdmin ? "accordion-body" : "accordion-body pb-0"}>
                                    {
                                        formatText(quest.description)
                                    }
                                    {
                                        loggedInPlayer.isAdmin ?
                                            <>
                                                <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/quests/edit/${quest.id}`)}>Edit</button>
                                                <button className="btn btn-danger btn-sm me-2" onClick={() => setDeleting(true)}>Delete</button>
                                                <button className="btn btn-success btn-sm" onClick={() => toggleCompleted()}>
                                                    {
                                                        quest.completed ?
                                                            "Mark as In Progress"
                                                            :
                                                            "Mark as Completed"
                                                    }
                                                </button>
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
    );
};

export default QuestCard;