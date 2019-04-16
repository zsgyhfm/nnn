import React from "react";
import styled from "styled-components";
import StockColorText from "components/Text/StockColorText";
import round from "lodash/round";

const StyleWrapper = styled.div`
    width: 70%;
    display: flex;
    .stock {
        line-height: 1;
        width: 2.0667rem;
        .name {
            color: #252525;
            font-size: 16px;
        }
        .code {
            font-size: 12px;
            color: #8e8e93;
            line-height: 1.3;
        }
    }
    .price {
        font-size: 22px;
        color: #ff4500;
        width: 2rem;
        line-height: 1.2;
        text-align: center;
    }
    .range {
        line-height: 30px;
        width: 0.9333rem;
        text-align: center;
    }
    .rate {
        line-height: 30px;
        flex: 1;
        text-align: center;
    }
`;

const StockPriceInfo = ({ stock }) => {
    const stockExist = stock && stock.code !== null;
    const range = stockExist
        ? round(stock.current_price - stock.yesterday_price, 2)
        : "--";
    const rate = stockExist
        ? round((range / stock.yesterday_price) * 100, 2) + "%"
        : null;
    return (
        <StyleWrapper>
            <div className="stock">
                <div className="name">{stockExist ? stock.name : "--"}</div>
                <div className="code">{stockExist ? stock.code : "--"}</div>
            </div>
            <div className="price">
                <StockColorText base={stockExist ? range : 0}>
                    {stockExist ? stock.current_price : "--"}
                </StockColorText>
            </div>
            <div className="range">
                <StockColorText base={stockExist ? range : 0}>
                    {" "}
                    {stockExist ? range : "--"}
                </StockColorText>
            </div>
            <div className="rate">
                <StockColorText base={stockExist ? range : 0}>
                    {" "}
                    {rate}
                </StockColorText>
            </div>
        </StyleWrapper>
    );
};

export default StockPriceInfo;
