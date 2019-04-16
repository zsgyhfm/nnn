import React from "react";
import styled from "styled-components";
import StockColorText from "components/Text/StockColorText";
import { numberFormat } from "../../../util";

const StyleWrapper = styled.tr`
    &&& > td {
        line-height: 30px;
        font-size: 14px;
        @media (max-width: 320px) {
            font-size: 12px;
        }
        border-bottom: 1px solid #e8e8e8;
        div {
            line-height: 1.5;
        }
        div:last-child {
            color: #8e8e93;
        }
    }
`;
const PositionItem = ({
    name,
    available,
    position,
    currentPrice,
    costPrice,
    profit,
    value,
    code,
    onClick
}) => {
    return (
        <StyleWrapper onClick={() => onClick(code)}>
            <td>
                <div>{name}</div>
                <div>{code}</div>
            </td>
            <td>
                <div>{available}</div>
                <div>{position}</div>
            </td>
            <td>
                <div>{currentPrice}</div>
                <div>{costPrice}</div>
            </td>
            <td>
                <div>
                    <StockColorText base={profit}>
                        {numberFormat(profit)}
                    </StockColorText>
                </div>
                <div>{numberFormat(value)}</div>
            </td>
        </StyleWrapper>
    );
};

export default PositionItem;
