import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";

const StyleWrapper = styled.div`
    background: linear-gradient(#ff4500, #ff6f42);
    padding: 10px 15px;
    font-size: 14px;
    color: #fff;
    .charge-group {
        border-top: 1px solid #FF8D68;
        display: flex;
        padding: 10px 0 0;

        .hd {
            flex: 1;
            padding-left: 10px;
            line-height: 1.2;
        }
    }
`;

const MemberHeader = ({ isLogin, ...rest }) => {
    const {memberData} = rest
    return (
        <StyleWrapper>
            {isLogin ? <AfterLogin {...rest} /> : <BeforeLogin />}
            <div className="charge-group">
                <div className="hd">
                    账户余额 <br /> { memberData && memberData.money ? memberData.money.account : "--"}
                </div>

                <Button color="#F54838" to="/member/charge">
                    充值
                </Button>
                <Button color="#FBC02D" to="/member/withdraw">
                    提现
                </Button>
            </div>
        </StyleWrapper>
    );
};

export default MemberHeader;

const Button = styled(Link)`
    display: inline-block;
    width: 2.1333rem;
    line-height: 0.9333rem;
    height: 0.9333rem;
    margin-left: 0.4rem;
    background-color: ${props => props.color};
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    color: #fff;
`;
