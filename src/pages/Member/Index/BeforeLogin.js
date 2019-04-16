import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    height: 4.7333rem;
    align-items: center;
    justify-content: center;
    & > div{
        display: inline-block;
        border: 1px solid #fff;
        padding: 0 20px;
        font-size: 16px;
        border-radius: 5px;
        a{
            color: #fff;
            line-height: 1.8;
        }
    }
`;

const BeforeLogin = () => {
    return (
        <StyleWrapper>
            <div>
                <Link to="/login">登录</Link> /  <Link to="/register">注册</Link>
            </div>
        </StyleWrapper>
    );
};

export default BeforeLogin;
