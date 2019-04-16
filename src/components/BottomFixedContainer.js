import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div.attrs({
    className: "footer-fixed"
})`
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 47px;
    & > div{
    }
`;

const BottomFixedContainer = ({ children }) => {
    return <StyleWrapper>{children}</StyleWrapper>;
};
export default BottomFixedContainer;
