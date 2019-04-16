import React from "react";
import noResult from "images/noresult.png";
import styled from "styled-components";

const StyleWrapper = styled.div`
    text-algin: center;
    img {
        width: 6rem;
    }
`;
const QueryEmpty = () => {
    return (
        <StyleWrapper>
            <img src={noResult} alt="" />
            <br />
            暂无数据
        </StyleWrapper>
    );
};
export default QueryEmpty;
