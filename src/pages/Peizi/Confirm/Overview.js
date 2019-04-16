import React from "react";
import TabBarHeader from "components/TabBarHeader";
import styled from "styled-components";

const StyleWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    margin: 0 15px;
    padding: 0.3rem 0.4rem;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    .item {
        flex: 1;
        text-align: center;
        border-right: 1px solid #E2E2E2;
        .hd{
            color: #8e8e93;
            font-size: 15px;
        }
        .num{
            font-size: 17px;
            color: #FF4500;
        }
        &:last-child {
            border-right: none;
        }
    }
`;

const Overview = ({total, depositMoney, gainMoney}) => {
    return (
        <TabBarHeader>
            <StyleWrapper>
                <div className="item">
                    <div className="hd">总操盘资金</div>
                    <div className="num">{total}元</div>
                </div>
                <div className="item">
                    <div className="hd">保证金</div>
                    <div className="num">{depositMoney}元</div>
                </div>
                <div className="item">
                    <div className="hd">配资金额</div>
                    <div className="num">{gainMoney}元</div>
                </div>
            </StyleWrapper>
        </TabBarHeader>
    );
};

export default Overview;
