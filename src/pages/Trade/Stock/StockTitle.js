import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyleWrapper = styled.div`
    text-align: center;
    line-height: 1;
    .name {
        font-size: 16px;
    }
    .code {
        font-size: 13px;
    }
`;

const StockTitle = ({ name, code }) => {
    return (
        <StyleWrapper>
            <div className="name">{name}</div>
            <div className="code">{code}</div>
        </StyleWrapper>
    );
};

export default StockTitle;

StockTitle.propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
};
