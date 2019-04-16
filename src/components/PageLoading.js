import React from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";

const StyleWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const PageLoading = () => {
    return (
        <StyleWrapper>
            <Icon type="loading" />
        </StyleWrapper>
    );
};

export default PageLoading;
