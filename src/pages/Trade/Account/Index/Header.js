import React from "react";
import styled from "styled-components";
import AccountMoney from "./AccountMoney";
import HeaderLogin from "./HeaderLogin";
import HeaderNotLogin from "./HeaderNotLogin";

const Header = ({ isLogin, subAccount }) => {
    return (
        <StyleWrapper>
            {isLogin ? (
                <HeaderLogin subAccount={subAccount} />
            ) : (
                <HeaderNotLogin />
            )}
            <AccountMoney subAccount={subAccount} />
        </StyleWrapper>
    );
};

export default Header;

const StyleWrapper = styled.div`
    background-color: #ff5e26;
    background: linear-gradient(to bottom, #ff4500, #ff6f42);
    height: 5.3333rem;
    display: flex;
    flex-direction: column;
`;
