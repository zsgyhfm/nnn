import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StockColorText from "components/Text/StockColorText";
import round from "lodash/round";

const StyleWrapper = styled(Link)`
    color: #252525;
    padding: 10px 15px;
    display: flex;
    position: relative;
    &::after {
        content: " ";
        display: block;
        height: 1px;
        background: #ddd;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        transform: scaleY(0.5);
    }
    div {
        flex: 1;
        font-size: 14px;
        text-align: center;
    }
    .left {
        flex: 0 0 32%;
        .name {
            text-align: left;
            font-size: 14px;
            color: #252525;
            line-height: 1.2;
        }
        .code {
            text-align: left;
            font-size: 12px;
        }
    }
`;

const StockItem = ({ item }) => {
    return (
        <StyleWrapper to={`/trade/stock/${item.code}`}>
            <div className="left">
                <div className="name">{item.name}</div>
                <div className="code">{item.code}</div>
            </div>
            <div>{round(item.current_price, 2)}</div>
            <div>
                <StockColorText base={item.range}>
                    {item.rate + " %"}
                </StockColorText>
            </div>
            <div>
                <StockColorText base={item.range}>
                    {item.range}
                </StockColorText>
            </div>
        </StyleWrapper>
    );
};
export default StockItem;
