import React from "react";
import styled from "styled-components";
const StyleWrapper = styled.div`
    margin: 5px 0 15px;
    .title{
        text-align: center;
        font-size: 16px;
        padding: 10px 0;
        color: #252525;
    }
    .handler{
        background-color: #fff;
        border: 1px solid #E8E8E8;
        border-radius: 6px;
        height: 1.1467rem;
        padding: 3px 5px;
    }
`;
const OperateBar = ({ title, children }) => {
    return (
        <StyleWrapper>
            <div className="title">{title}</div>
            <div className="handler">{children}</div>
        </StyleWrapper>
    );
};
export default OperateBar;
