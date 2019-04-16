import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.span`
    display: inline-block;
    color: #459df5;
    border: 1px solid #459df5;
    line-height: 20px;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 3px;
    float: ${props => (props.float ? props.float : "none")};
`;
const CopyBtn = ({ onClick, copyContent, ...rest }) => {
    return (
        <StyleWrapper onClick={onClick} {...rest}>
            复制
        </StyleWrapper>
    );
};

export default CopyBtn;
