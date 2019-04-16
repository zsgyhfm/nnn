import React from "react";
import styled from "styled-components";
import round from "lodash/round";
import StockColorText from "components/Text/StockColorText";
const StyleWrapper = styled.div`
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    background-color: #fff;
    .section-price {
        line-height: 1.2;
        width: 33%;
        padding: 0 30px 0 0;
        .current-price {
            text-align: center;
            font-size: 22px;
            white-space: nowrap;
        }
        .price-range {
            display: flex;
            justify-content: space-between;
            span {
                padding: 0 5px;
            }
        }
    }
    .meta {
        flex: 1;
        display: inline-flex;
        flex-wrap: wrap;
        line-height: 1.9;
        font-size: 10px;
        .item {
            width: 50%;
            text-align: left;
            padding-left: 20px;
            .label {
                color: #8e8e93;
                padding: 10px;
            }
        }
    }
`;
const StockPrice = ({ stock }) => {
    const range = stock
        ? round(stock.current_price - stock.yesterday_price, 2)
        : "--";
    const rate = stock ? round((range / stock.yesterday_price) * 100, 2) : "--";

    return (
        <StyleWrapper>
            <div className="section-price">
                <div className="current-price">
                    <StockColorText base={range}>
                        {stock ?  stock.current_price : "--"}
                    </StockColorText>
                </div>
                <div className="price-range">
                    <span>
                        <StockColorText base={range}>{range}</StockColorText>
                    </span>
                    <span>
                        <StockColorText base={range}>{rate}%</StockColorText>
                    </span>
                </div>
            </div>
            <div className="meta">
                <div className="item">
                    <span className="label">今开</span>
                    <span>
                        <StockColorText
                            base={stock && stock.open_price !== "0.00" ? stock.open_price - stock.yesterday_price : 0 }
                        >
                            {stock ? stock.open_price : "--"}
                        </StockColorText>
                    </span>
                </div>
                <div className="item">
                    <span className="label">最 高</span>
                    <span>{stock ? stock.highest : "--"}</span>
                </div>
                <div className="item">
                    <span className="label">昨收</span>
                    <span>{stock ? stock.yesterday_price : "--"}</span>
                </div>
                <div className="item">
                    <span className="label">最 低</span>
                    <span>{stock ? stock.lowest : "--"}</span>
                </div>
            </div>
        </StyleWrapper>
    );
};

export default StockPrice;
