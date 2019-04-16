import React from "react";
import { Link, Route } from "react-router-dom";

const Item = ({ to, figure, figureActive, title }) => (
    <Route
        path={to}
        exact
        children={({ match }) => (
            <div className="weui-tabbar__item">
                <Link to={to}>
                    <img
                        src={match ? figureActive : figure}
                        alt={title}
                        style={{
                            width: "22px",
                            height: "22px"
                        }}
                        className="weui-tabbar__icon"
                    />
                    <p className="weui-tabbar__label" style={{color: match ? "#FF4500" : "#999"}}>{title}</p>
                </Link>
            </div>
        )}
    />
);

export default Item