import styled from "styled-components";
import React from "react";
import round from "lodash/round";
import VolumeFormatter from "./../VolumeFormatter";
import StockColorText from "components/Text/StockColorText";
const KCHartHeader = ({ meta, visible }) => {
    const prices = meta["日K"];
    const yesterdayPrice = meta["yesterdayPrice"];
    return (
        <StyleWrapper style={{ visibility: visible ? "visible" : "hidden" }}>
            <div className="price-info">
                <span>
                    开：<StockColorText
                        base={prices ? prices[1] - yesterdayPrice : 0}
                    >
                        {prices ? prices[1] : null}
                    </StockColorText>
                </span>
                <span>
                    收：<StockColorText
                        base={prices ? prices[2] - yesterdayPrice : 0}
                    >
                        {prices ? prices[2] : null}
                    </StockColorText>
                </span>
                <span>
                    高：<StockColorText
                        base={prices ? prices[4] - yesterdayPrice : 0}
                    >
                        {prices ? prices[4] : null}
                    </StockColorText>
                </span>
                <span>
                    低：<StockColorText
                        base={prices ? prices[3] - yesterdayPrice : 0}
                    >
                        {prices ? prices[3] : null}
                    </StockColorText>
                </span>
                <span>
                    幅：<StockColorText
                        base={prices ? prices[2] - yesterdayPrice : 0}
                    >
                        {prices
                            ? round(
                                  ((prices[2] - yesterdayPrice) /
                                      yesterdayPrice) *
                                      100,
                                  2
                              ) + "%"
                            : null}
                    </StockColorText>
                </span>
                <span>
                    额：
                    <VolumeFormatter value={meta["成交量"]} tagName="span" />
                </span>
            </div>

            <div className="ma-line">
                <span>
                    <span style={{ color: "#FF3E8B" }}>MA5：</span>
                    <span>{meta["MA5"]}</span>
                </span>
                <span>
                    <span style={{ color: "#FFAC00" }}>MA10：</span>
                    <span>{meta["MA10"]}</span>
                </span>
                <span>
                    <span style={{ color: "#27E0EF" }}>MA20：</span>
                    <span>{meta["MA20"]}</span>
                </span>
            </div>
        </StyleWrapper>
    );
};

export default KCHartHeader;

const StyleWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: -30px;
    color: #8e8e93;
    width: 100%;
    & > .price-info {
        padding: 0 10px;
        flex-wrap: wrap;
        & > span {
            font-size: 10px;
            line-height: 16px;
            padding-right: 3px;
        }
    }
    .ma-line {
        text-align: right;
        font-size: 11px;
        & > span {
            padding-right: 12px;
        }
    }
`;
