import React from "react";
import styled from "styled-components";
import agentHeaderBg from "images/dailishang@2x.png";
const StyleWrapper = styled.div`
    padding: 0 20px;
    overflow: hidden;
    background: url(${agentHeaderBg}) no-repeat;
    background-size: cover;
    .header-wrap {
        background-color: #fff;
        border-radius: 15px;
        margin-bottom: 30px;
    }
    .data-info {
        display: flex;
        padding: 15px 20px;
        .cell {
            flex: 1;
            text-align: center;
            padding: 0 10px;
            .title {
                font-size: 14px;
            }
            .value {
                font-size: 22px;
                @media (max-width: 320px) {
                    font-size: 18px;
                }
                color: #ff4500;
                .unit {
                    font-size: 12px;
                }
            }
        }
    }
    .share-btn {
        width: 50%;
        color: #fff;
        font-size: 16px;
        line-height: 40px;
        border-radius: 20px;
        background-color: #ff4500;
        margin: 0 auto;
        text-align: center;
    }
    p {
        text-align: center;
        color: #ff4500;
        line-height: 40px;
        padding-bottom: 10px;
    }
`;
const Header = ({ money, people, rate, showInvite }) => {
    return (
        <StyleWrapper>
            <div className="header-wrap">
                <div className="data-info">
                    <div className="cell">
                        <div className="title">名下用户</div>
                        <div className="value">
                            {people} <span className="unit">人</span>
                        </div>
                    </div>
                    <div className="cell">
                        <div className="title">已赚佣金</div>
                        <div className="value">
                            {money} <span className="unit">元</span>
                        </div>
                    </div>
                </div>
                <div className="share-btn" onClick={showInvite}>立即推广</div>
                <p>佣金比例：所邀请用户配资管理费的{rate}%</p>
            </div>
        </StyleWrapper>
    );
};

export default Header;