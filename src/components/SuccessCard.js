import React from "react";

const SuccessCard = ({ message }) => {
    return (
        <div className="position-fixed bottom-0">
            <div className="card">
                <div className="card-header text-bg-success">
                    <b>Success!</b>
                </div>
                <div className="card-body">
                    <p className="card-text">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessCard;