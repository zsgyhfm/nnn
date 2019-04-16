import React from "react";
import styled from "styled-components";
import HeaderWrapper from "./HeaderWrapper";

const HeaderLogin = ({subAccount}) => {
    return (
        <HeaderWrapper>
            <div>
                <AccountMoney>{subAccount ? subAccount.total_money : '--'}</AccountMoney>
                <p>账号总资产(元)</p>
            </div>
        </HeaderWrapper>
    )
};

export default HeaderLogin

const AccountMoney = styled.span`
    font-size: 30px
`