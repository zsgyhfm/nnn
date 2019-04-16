import React from "react";
import styled from "styled-components";
import addImg from "images/tinajiada@2x.png";
import { Link } from "react-router-dom";
const StyleWrapper = styled.div`
    min-height: 300px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
        color: #8E8E93;
    }
    img {
        width: 30px;
        height: 30px;
    }
`;
const NoSelection = () => {
    return (
        <StyleWrapper>
            <Link to="/trade/search">
                <img src={addImg} alt="add" /> <br/>
                点击添加自选
            </Link>
        </StyleWrapper>
    );
};

export default NoSelection;
