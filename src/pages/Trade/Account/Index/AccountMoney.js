import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    height: 1.4667rem;
    color: #fff;
    text-align: center;
    .item {
        flex: 1;
        margin: 10px 0;
    }
    .item:not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
`;
const AccountMoney = ({subAccount}) => {
    return (
        <StyleWrapper>
            <div className="item">
                <div className="label">持仓市值</div>
                <div className="value">{subAccount ? subAccount.market_value : '--'}</div>
            </div>
            <div className="item">
                <div className="label">可用金额</div>
                <div className="value">{subAccount ? subAccount.avail : '--'}</div>
            </div>
            <div className="item">
                <div className="label">冻结金额</div>
                <div className="value">{subAccount ? subAccount.freeze_amount : '--'}</div>
            </div>
        </StyleWrapper>
    );
};

export default AccountMoney;
