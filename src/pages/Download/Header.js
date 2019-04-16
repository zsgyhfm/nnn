import React from "react";
import styled from "styled-components";
import Banner from 'images/download/wallets.png'

const StyleWrapper = styled.div`
    text-align: center;
    img {
        max-width: 100%;
    }
`;
const Header = () => {
    return (
        <StyleWrapper>
            <img src={Banner} alt="banner" />
        </StyleWrapper>
    );
};

export default Header;
