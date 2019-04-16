import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderWrapper from "./HeaderWrapper";

const HeaderNotLogin = () => {
    return (
        <HeaderWrapper>
            <div>
                <LoginButton to="/login">登录账户</LoginButton>
                <p>成功申请操盘后，可获得交易账号</p>
            </div>
        </HeaderWrapper>
    );
};
export default HeaderNotLogin;

const LoginButton = styled(Link)`
    display: inline-block;
    line-height: 35px;
    padding: 0 20px;
    font-size: 16px;
    border-radius: 5px;
    color: #fff;
    border: 1px solid #fff;
    margin: 5px 0;
`;
