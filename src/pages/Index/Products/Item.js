import React from "react";
import { Link } from "react-router-dom";

const Item = ({ to, figure, title, text }) => {
    return (
        <div className="item">
            <Link to={to}>
                <div className="figure">
                    <img src={figure} alt="" />
                </div>
                <div className="item-bd">
                    <div className="title">{title}</div>
                    <p>{text}</p>
                </div>
            </Link>
        </div>
    );
};

export default Item;
