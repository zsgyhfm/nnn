import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Toast } from "antd-mobile";
import chedan from "images/chedan@2x.png";
import chengjiao from "images/chengjiao@2x.png";
import chicang from "images/chicang@2x.png";
import zijin from "images/zijin@2x.png";
import maichu from "images/maichu@2x.png";
import mairu from "images/mairu@2x.png";
import chaxun from "images/chaxun@2x.png";
import weituo from "images/weituo@2x.png";

const StyleWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    margin-bottom: 15px;
    & > div {
        display: flex;
        width: 25%;
        height: 2.2667rem;
        align-items: center;
        justify-content: center;
        a {
            text-align: center;
            color: #252525;
            img {
                max-width: 0.9333rem;
                max-height: 0.9333rem;
            }
        }
    }
`;

const items = [
    { id: 1, figure: mairu, label: "买入", link: "/trade/buy/index" },
    { id: 2, figure: maichu, label: "卖出", link: "/trade/sell/index" },
    {
        id: 3,
        figure: chedan,
        label: "撤单",
        link: "/trade/account/cancel"
    },
    {
        id: 4,
        figure: weituo,
        label: "委托",
        link: "/trade/account/query/entrust"
    },
    { id: 5, figure: chicang, label: "持仓", link: "/trade/account/position" },
    {
        id: 6,
        figure: chengjiao,
        label: "成交记录",
        link: "/trade/account/query/deal"
    },
    {
        id: 7,
        figure: zijin,
        label: "交割查询",
        link: "/trade/account/query/delivery"
    },
    { id: 8, figure: chaxun, label: "查询", link: "/trade/account/query/index" }
];

const GridLink = ({ history, hasAccount }) => {
    return (
        <StyleWrapper>
            {items.map(item => (
                <Item
                    key={item.id}
                    data={item}
                    history={history}
                    hasAccount={hasAccount}
                />
            ))}
        </StyleWrapper>
    );
};
const mapStateToProps = state => ({
    hasAccount: !!state.subAccount.id
});
export default withRouter(connect(mapStateToProps)(GridLink));

const Item = ({ data, history, hasAccount }) => {
    return (
        <div
            onClick={() => {
                hasAccount
                    ? history.push(data.link)
                    : Toast.info("请申请操盘，获取操盘账号", 1.5, null, false);
            }}
        >
            <a>
                <div className="figure">
                    <img src={data.figure} alt="thumbnail" />
                </div>
                <div className="text">{data.label}</div>
            </a>
        </div>
    );
};
