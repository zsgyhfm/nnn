import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyleWrapper = styled.div`
    margin: 5px 0;
    display: flex;
    border: 1px solid #fff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 30px;
    a{
        display: inline-block;
        text-align: center;
        padding: 0 25px;
        color: #fff;
        &.active{
            background-color: #fff;
            color: #FF4500;
        }
    }
`;

const MarketHeader = () => {
    return (
        <StyleWrapper>
            <NavLink to="/trade/selection">自选</NavLink>
            <NavLink to="/trade/market/index">行情</NavLink>
        </StyleWrapper>
    );
};

export default MarketHeader;
