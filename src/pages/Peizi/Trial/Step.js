import React from "react";

const Step = ({idx, children}) => {
    return (
        <div className="item">
            <span className="order-list">{idx}</span>
            <div className="bubble-box">{children}</div>
        </div>
    );
};

export default Step;
