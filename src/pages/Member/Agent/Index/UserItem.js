import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const StyleWrapper = styled(Link)`
    padding: 0 10px;
    background-color: #fff;
    margin-bottom: 10px;
    display: block;
    color: #292929;
    .hd {
        display: flex;
        padding: 5px 0;
        line-height: 25px;
        border-bottom: 1px solid #e8e8e8;
        .cell {
            flex: 1;
        }
    }
    .bd {
        display: flex;
        text-align: center;
        .cell {
            flex: 1;
            padding: 10px 0;
            .title {
                color: #8e8e93;
            }
        }
    }
`;

const UserItem = ({ item }) => {
    return (
        <StyleWrapper
            to={{
                pathname: `/member/agent/user/${item.invitation_mid}`,
                state: item
            }}
        >
            <div className="hd">
                <div className="cell">{item.mobile}</div>
                <div className="cell">用户名: {item.name || '--'}</div>
                <div className="cell">级别: {item.agent_des}</div>
            </div>
            <div className="bd">
                <div className="cell">
                    <div className="title">邀请用户</div>
                    <div className="value">{item.profit_member}人</div>
                </div>
                <div className="cell">
                    <div className="title">他的收入</div>
                    <div className="value">{item.invitation_money}元</div>
                </div>
                <div className="cell">
                    <div className="title">替你赚取</div>
                    <div className="value">{item.agents_profit_money}元</div>
                </div>
                <div className="cell">
                    <div className="title">返佣比例</div>
                    <div className="value">{item.agent_rate}%</div>
                </div>
            </div>
        </StyleWrapper>
    );
};
export default UserItem;
