import React from "react";
import { Flex } from "antd-mobile";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
const StyleWrapper = styled(Flex)`
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    a {
        display: block;
        margin: 0 10px;
        border-bottom: 3px solid transparent;
        text-align: center;
        color: #8e8e93;
        font-size: 14px;
        @media (min-width: 320px) and (max-width: 340px) {
            font-size: 12px;
        }
        &.active {
            color: #ff4500;
            border-color: #ff4500;
        }
    }
`;
//我的操盘 导航条样式StyleWrapper Flex这些是UI框架
const TabNav = ({ match, location }) => {
    return (
        <StyleWrapper>
            <Flex.Item>
                <NavLink to="/member/peizi/list/index">全部</NavLink>
            </Flex.Item>
            <Flex.Item>
                <NavLink to="/member/peizi/list/using">操盘中</NavLink>
            </Flex.Item>
            <Flex.Item>
                <NavLink to="/member/peizi/list/waiting">审核中</NavLink>
            </Flex.Item>
            <Flex.Item>
                <NavLink to="/member/peizi/list/failed">未通过</NavLink>
            </Flex.Item>
            <Flex.Item>
                <NavLink to="/member/peizi/list/finished">已结束</NavLink>
            </Flex.Item>
        </StyleWrapper>
    );
};

export default withRouter(TabNav);
