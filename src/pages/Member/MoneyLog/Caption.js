import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    background-color: #f4f5f7;
    line-height: 35px;
    text-align: center;
    div{
        flex: 1;
        color: #8e8e93;
    }
`;
const Caption = () => {
    return (
        <StyleWrapper>
            <div>发生日期</div>
            <div>交易类型</div>
            <div>发生金额</div>
            <div>账户余额</div>
        </StyleWrapper>
    );
};

export default Caption;
