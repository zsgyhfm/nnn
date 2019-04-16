import React from "react";
import styled from "styled-components";
const StyleWrapper = styled.div`
    display: flex;
    div {
        flex: 1;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        background-color: #F3F7FF;
    }
`;

const CommissionHeader = ({ fields }) => {
    return (
        <StyleWrapper>
            {fields.map((item, index) => <div key={index}>{item.label}</div>)}
        </StyleWrapper>
    );
};

export default CommissionHeader;
