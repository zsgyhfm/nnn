import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyleWrapper = styled.div`
    display: flex;
    background-color: #fff;
    position: relative;
    &::after {
        content:" ";
        display: block;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        transform: scaleY(0.5);
        background-color: #E8E8E8;
    }
    & > a {
        flex: 1;
        text-align: center;
        color: #8E8E93;
        font-size: 14px;
        line-height: 35px;
        border-bottom: 2px solid transparent;
        &.active{
            border-color: #FF4500;
            color: #FF4500;
        }
    }
`;

const TabBarNav = ({ items }) => {
    return (
        <StyleWrapper>
            {items.map((item, index) => <NavLink key={index} to={item.link} exact={false}>{item.title}</NavLink>)}
        </StyleWrapper>
    );
};

export default TabBarNav