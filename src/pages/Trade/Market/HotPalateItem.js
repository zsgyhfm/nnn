import React from "react";
import styled from "styled-components";
import StockColorText from "components/Text/StockColorText";
import { Link } from "react-router-dom";
const StyleWrapper = styled(Link)`
    display: block;
    width: 33.333333%;
    padding: 10px 10px;
    border: 1px solid #f4f7ff;
    margin-left: -1px;
    .title {
        text-align: center;
        font-size: 14px;
        color: #252525;
    }
    .rate {
        font-size: 18px;
        text-align: center;
        line-height: 1.2;
    }
    .name {
        font-size: 12px;
        color: #8e8e93;
        text-align: center;
    }
    .meta {
        display: flex;
        color: #8e8e93;
        justify-content: space-between;
        div {
            font-size: 12px;
        }
    }
`;
const HotPalateItem = ({ title, rate, name, price, stockRate, code }) => {
    return (
        <StyleWrapper
            to={{
                pathname: `/trade/market/bankuai/${code}`,
                state: { pageTitle: title }
            }}
        >
            <div className="title">{title}</div>
            <div className="rate">
                <StockColorText base={rate}>{rate}%</StockColorText>
            </div>
            <div className="name">{name}</div>
            <div className="meta">
                <div>{price}</div>
                <div>{stockRate}%</div>
            </div>
        </StyleWrapper>
    );
};

export default HotPalateItem;
