import React from "react";
import styled from "styled-components";
import round from "lodash/round";
import StockColorText from "components/Text/StockColorText";
import { withRouter } from "react-router-dom";
const StyleWrapper = styled.tr`
    && td {
        padding: 10px;
        border-bottom: 1px solid #f1f1f1;
        line-height: 1.5;
        & > div:last-child {
            color: #8e8e93;
        }
    }
`;

const PositionItem = ({ item, history }) => {
    return (
        <StyleWrapper
            onClick={() => {
                history.push(`/trade/sell/${item.code}`);
            }}
        >
            <td align="left">
                <div>{item.name}</div>
                <div className="code">{item.code}</div>
            </td>
            <td>
                <div>
                    <StockColorText base={item.ck_profit}>
                        {item.canbuy_count}
                    </StockColorText>
                </div>
                <div>{item.stock_count}</div>
            </td>
            <td>
                <div>
                    <StockColorText base={item.ck_profit}>
                        {round(item.now_price, 2).toFixed(2)}
                    </StockColorText>
                </div>
                <div>{item.ck_price}</div>
            </td>
            <td align="right">
                <div>
                    <StockColorText base={item.ck_profit}>
                        {round(item.ck_profit, 2).toFixed(2)}
                    </StockColorText>
                </div>
                <div>{round(item.now_price * item.stock_count, 2)}</div>
            </td>
        </StyleWrapper>
    );
};

export default withRouter(PositionItem);
