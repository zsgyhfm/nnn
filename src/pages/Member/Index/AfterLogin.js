import React, { Fragment } from "react";
import styled from "styled-components";
import Message from "components/Message";
import avatar from "images/avatar2.png";
import { hideTelephone } from "../../../util";

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;
const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5333rem 0;
    img {
        width: 1.5467rem;
        height: 1.5467rem;
        border-radius: 50%;
        margin-right: 10px;
    }
    .name {
        font-size: 16px;
    }
`;

const MoneyInfo = styled.div`
    display: flex;
    border-top: 1px solid #ff8d68;
    padding: 0.3733rem 0;
    .item {
        flex: 1;
        text-align: center;
        &:not(:last-child) {
            border-right: 1px solid #ff8d68;
        }
    }
`;

MoneyInfo.Item = ({ title, value }) => {
    return (
        <div className="item">
            <div className="title">{title}</div>
            <div className="value">{value}</div>
        </div>
    );
};

const AfterLogin = ({ memberData }) => {
    return (
        <Fragment>
            <Header>
                <AvatarContainer>
                    <img src={memberData.info && memberData.info.head_img? memberData.info.head_img : avatar} alt="avatar" />
                    <div className="name">
                        {memberData.loaded ? hideTelephone(memberData.info.mobile) : "--"}
                    </div>
                </AvatarContainer>
                <Message
                    margin="0"
                    number={memberData.loaded ? memberData.info.msg_num : 0}
                />
            </Header>
            <MoneyInfo>
                <MoneyInfo.Item
                    title="账户资金"
                    value={memberData.loaded ? memberData.money.total : "--"}
                />
                <MoneyInfo.Item
                    title="保证金"
                    value={memberData.loaded ? memberData.money.bond_account : "--"}
                />
                <MoneyInfo.Item
                    title="冻结金额"
                    value={memberData.loaded ? memberData.money.freeze : "--"}
                />
            </MoneyInfo>
        </Fragment>
    );
};

export default AfterLogin;
