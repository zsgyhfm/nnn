import React from "react";
import { Link } from "react-router-dom";
import iconSearch from "images/icon-search.png";
import styled from "styled-components";

const Search = () => {
    return (
        <StyledWrap>
            <Link to="/trade/search">
                <img src={iconSearch} alt="search" /> 搜索股票
            </Link>
        </StyledWrap>
    );
};

export default Search;

const StyledWrap = styled.div`
    flex: 1;
    a {
        display: block;
        background-color: rgba(255, 255, 255, 0.5);
        color: #fff;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 10px;
        border-radius: 0.4rem;
    }

    img {
        width: 0.4267rem;
        height: 0.4267rem;
        position: relative;
        top: 0.1rem;
    }
`;
