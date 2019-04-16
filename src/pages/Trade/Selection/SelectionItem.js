import React from "react";
import StockColorText from "components/Text/StockColorText";
import round from "lodash/round";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const StyleWrapper = styled.tr`
    border-bottom: 1px solid #eaeaea;
    &&& td {
        padding: 10px 8px;
        a {
            color: inherit;
        }
    }
`;
const SelectionItem = ({ data: item, history }) => {
    return (
        <StyleWrapper
            onClick={() => {
                history.push(`/trade/stock/${item.code}`);
            }}
        >
            <td align="left">
                <div>{item.name}</div>
                <div>{item.code}</div>
            </td>
            <td>
                <StockColorText base={item.range}>
                    {round(item.current_price, 2)}
                </StockColorText>
            </td>
            <td>
                <StockColorText base={item.range}>
                    {item.rate || item.rate === 0 ? item.rate + " %" : "--"}
                </StockColorText>
            </td>
            <td>
                <StockColorText base={item.range}>
                    {item.range || item.range === 0 ? item.range : "--"}
                </StockColorText>
            </td>
        </StyleWrapper>
    );
};

export default withRouter(SelectionItem);
