import React from "react";
import styled from "styled-components";
import TextWithQuestionMark from "components/TextWithQuestionMark";
const StyleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    font-size: 16px;
    line-height: 35px;
    background-color: #fff;
    .label {
        padding-right: 10px;
    }
    .value {
        color: #8e8e93;
    }
`;
const StockLine = ({ warnLine, closeLine }) => {
    return (
        <StyleWrapper>
            <div className="item">
                <span className="label">
                    <TextWithQuestionMark
                        text="警戒线"
                        info="总操盘资金低于预警线后，该账号禁止继续买入股票"
                    />
                </span>{" "}
                <span className="value">{warnLine}</span>
            </div>
            <div className="item">
                <span className="label">
                    <TextWithQuestionMark
                        text="平仓线"
                        info="总操盘资金低于平仓线后，持仓股票会被强制平仓"
                    />
                </span>{" "}
                <span className="value">{closeLine}</span>
            </div>
        </StyleWrapper>
    );
};

export default StockLine;
