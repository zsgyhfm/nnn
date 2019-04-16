import React from "react";
import styled from "styled-components";
import { numberFormat } from "../../../util";

const StyleWrapper = styled.table`
    color: #252525;
    background-color: #fff;
    padding: 5px 0;
    td {
        padding: 0 10px;
        span {
            display: inline-block;
            text-align: left;
            font-size: 10px;
        }
        .label {
            color: #8e8e93;
            padding-right: 5px;
            text-align: right;
        }
    }
`;

const StockMeta = ({ stock }) => {
    return (
        <StyleWrapper>
            <tbody>
                <tr>
                    <td width="33.3333%">
                        <span className="label">成交量</span>
                        <span>{stock ? numberFormat(stock.volume) : "--"}</span>
                    </td>
                    <td width="33.3333%">
                        <span className="label">市盈率</span>
                        <span>{stock ? stock.pe_ratio : "--"}</span>
                    </td>
                    <td width="33.3333%">
                        <span className="label">换手率</span>
                        <span>{stock ? stock.turnover_rate + "%" : "--"}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="label">成交额</span>
                        <span>
                            {stock
                                ? numberFormat(stock.turnover * 10000)
                                : "--"}
                        </span>
                    </td>
                    <td>
                        <span className="label">市净率</span>
                        <span>{stock ? stock.pb_ratio : "--"}</span>
                    </td>
                    <td>
                        <span className="label">总市值</span>
                        <span>
                            {stock ? stock.total_market_value + "亿" : "--"}
                        </span>
                    </td>
                </tr>
            </tbody>
        </StyleWrapper>
    );
};

export default StockMeta;
