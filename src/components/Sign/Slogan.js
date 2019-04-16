import React from 'react'
import logo from "images/login-logo.png";
import styled from "styled-components";

const StyleWrapper = styled.div`
    text-align: center;
    padding: 20px 30px;
    img{
        max-width: 50%;
    }
`

const Slogan = () => {
    return (
        <StyleWrapper>
            <img src={logo} alt="logo" />
        </StyleWrapper>
    );
};

export default Slogan
