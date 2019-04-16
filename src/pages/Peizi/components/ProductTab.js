import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import TabBarHeader from "components/TabBarHeader";
const StyleWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    margin: 0 15px;
    padding: 0.3rem 0.4rem;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    .item {
        flex: 1;
        text-align: center;
        a {
            display: inline-block;
            font-size: 0.3733rem;
            color: #ff4500;
            border: 1px solid #ff4500;
            line-height: 0.7733rem;
            border-radius: 5px;
            padding: 0 0.1067rem;
            &.active {
                background-color: #ff4500;
                color: #fff;
            }
        }
    }
`;

const ProductTab = ({ match }) => {
    return (
        <TabBarHeader>
            <StyleWrapper>
                <div className="item">
                    <NavLink to="/peizi/day">按天配资</NavLink>
                </div>
                <div className="item">
                    <NavLink to="/peizi/week">按周配资</NavLink>
                </div>
                <div className="item">
                    <NavLink to="/peizi/month">按月配资</NavLink>
                </div>
                <div className="item">
                    <NavLink to="/peizi/free">免息配资</NavLink>
                </div>
            </StyleWrapper>
        </TabBarHeader>
    );
};

export default withRouter(ProductTab);
