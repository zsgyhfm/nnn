import React from "react";
import Avatar from "./Avatar";
import Search from "./Search";
import Message from "components/Message";
import styled from "styled-components";

const StyleWrapper = styled.div`
    width: 100%;
    z-index: 10;
    top: 0;
    left: 0;
    padding: 8px 0;
    display: flex;
    position: fixed;
    position: -webkit-sticky;
`;

const Header = ({ msgNumber,telephone }) => {
    return (
        <StyleWrapper id="j-index-header">
            <Avatar telephone={telephone} />
            <Search />
            <Message number={msgNumber} />
        </StyleWrapper>
    );
};
export default Header;
