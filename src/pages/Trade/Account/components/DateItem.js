import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    flex: 1;
    text-align: center;
    .label {
        color: #8e8e93;
    }
    .value {
        font-size: 18px;
        line-height: 1;
    }
`;

const DateItem = ({ label, value, onClick }) => {
    return (
        <StyleWrapper onClick={onClick}>
            <div className="label">{label}</div>
            <div className="value">{value}</div>
        </StyleWrapper>
    );
};

export default DateItem;
