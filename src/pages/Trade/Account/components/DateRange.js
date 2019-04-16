import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    text-align: center;
    background-color: #ffffff;
    padding: 10px 0;
    .item {
        display: inline-block;
        line-height: 25px;
        margin: 0 10px;
        padding: 0 15px;
        color: #8e8e93;
        border: 1px solid #8e8e93;
        border-radius: 4px;
        &.active {
            color: #fff;
            background-color: #ff4500;
            border-color: #ff4500;
        }
    }
`;

const DateRange = ({ onSelect, active}) => {
    return (
        <StyleWrapper>
            <div
                className={`item ${active === 1 ? "active" : ""}`}
                onClick={() => onSelect(1)}
            >
                当日
            </div>
            <div
                className={`item ${active === 2 ? "active" : ""}`}
                onClick={() => onSelect(2)}
            >
                近1周
            </div>
            <div
                className={`item ${active === 3 ? "active" : ""}`}
                onClick={() => onSelect(3)}
            >
                近1月
            </div>
        </StyleWrapper>
    );
};

export default DateRange;
