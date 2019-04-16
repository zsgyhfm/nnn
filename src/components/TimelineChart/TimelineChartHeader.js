import React from "react";
import { nullValueToDash } from "../../util";
import round from "lodash/round";
import styled from "styled-components";
import StockColorText from "components/Text/StockColorText";

const TimelineChartHeader = ({ data, yesterdayPrice }) => {
    const baseRange = data.price - yesterdayPrice;
    const zhangdie =
        nullValueToDash(
            round(((data.price - yesterdayPrice) / yesterdayPrice) * 100, 2)
        ) + "%";

    const updownClass =
        data.price - yesterdayPrice > 0
            ? "up"
            : data.price - yesterdayPrice < 0
                ? "down"
                : "";
    return (
        <StyleWrapper>
            <span>时间：{data.time}</span>
            <span className={updownClass}>
                价格：{data.price ? (
                    <StockColorText base={baseRange}>
                        {data.price}
                    </StockColorText>
                ) : (
                    "--"
                )}
            </span>
            <span className={updownClass}>
                涨跌：{data.price ? (
                    <StockColorText base={baseRange}>{zhangdie}</StockColorText>
                ) : (
                    "--"
                )}
            </span>
            <span>成交： {data.volume ? data.volume + "手" : null}</span>
        </StyleWrapper>
    );
};
export default TimelineChartHeader;

const StyleWrapper = styled.div`
    color: #8e8e93;
    & > span {
        padding: 0 5px;
        line-height: 20px;
        font-size: 12px;
    }
`;
