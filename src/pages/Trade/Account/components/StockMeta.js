import React from "react";
import styled from "styled-components";
import round from "lodash/round";

const StyleWrapper = styled.div`
    display: flex;
    padding: 0 15px;
    background-color: #fff;
    & > .item {
        flex: 1;
        font-size: 14px;
        padding 10px 0;
        display: flex;
        border-top: 1px solid #f2f2f2;
        justify-content: space-between;
        .label {
            color: #8e8e93;
        }
        .value {
            color: #252525;
            text-align: center;
            width: 50%;
        }
    }
`;
const StockMeta = ({ stock }) => {
    const stockExist = stock && stock.code !== null;

    return (
        <StyleWrapper>
            <div className="item">
                <span className="label">最高</span>
                <span className="value">
                    {stockExist ? round(stock.highest, 2) : "--"}
                </span>
            </div>
            <div className="item">
                <span className="label">最低</span>
                <span className="value">
                    {stockExist ? round(stock.lowest, 2) : "--"}
                </span>
            </div>
            <div className="item">
                <span className="label">涨停</span>
                <span className="value">
                    {stockExist ? round(stock.yesterday_price * 1.1, 2) : "--"}
                </span>
            </div>
            <div className="item">
                <span className="label">跌停</span>
                <span className="value">
                    {stockExist ? round(stock.yesterday_price * 0.9, 2) : "--"}
                </span>
            </div>
        </StyleWrapper>
    );
};
export default StockMeta;
