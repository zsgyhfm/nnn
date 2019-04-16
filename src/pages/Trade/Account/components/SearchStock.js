import React from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
const StyleWrapper = styled(Link)`
    display: flex;
    color: #ff4a07;
    border: 1px solid #ff4a07;
    align-items: center;
    border-radius: 4px;
    flex: 1;
    height: 30px;
    line-height: 30px;
    padding: 4px 8px;
    white-space: nowrap;
    overflow: hidden;
`;

const SearchStock = ({ match }) => {
    return (
        <StyleWrapper
            to={{
                pathname: "/trade/search",
                state: {
                    from: match.path.replace(/:code/, "")
                }
            }}
        >
            <Icon type="search" size="xl" /> 搜索股票
        </StyleWrapper>
    );
};

export default withRouter(SearchStock);
