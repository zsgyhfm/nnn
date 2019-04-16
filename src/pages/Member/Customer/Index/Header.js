import React from "react";
import headerImg from "images/tuiguangHeader.png";
import styled from "styled-components";

const StyleWrapper = styled.div`
    img {
        max-width: 100%;
    }
`;
const Header = () => {
    return (
        <StyleWrapper>
            <img src={headerImg} alt="header" />
        </StyleWrapper>
    );
};

export default Header;
