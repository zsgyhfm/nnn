import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    .cell {
        flex: 1;
        text-align: center;
        margin: 10px 0 20px;
        &:first-child{
            border-right: 1px solid #E8E8E8;
        }
        .title {
            font-size: 14px;
        }
        .value {
            color: #ff4500;
            font-size: 22px;
            .unit {
                font-size: 12px;
            }
        }
    }
`;

const TotalData = ({ people, money }) => {
    return (
        <StyleWrapper>
            <div className="cell">
                <div className="title">邀请用户</div>
                <div className="value">
                    {people} <span className="unit">人</span>
                </div>
            </div>
            <div className="cell">
                <div className="title">获得佣金</div>
                <div className="value">
                    {money} <span className="unit">元</span>
                </div>
            </div>
        </StyleWrapper>
    );
};

export default TotalData;
