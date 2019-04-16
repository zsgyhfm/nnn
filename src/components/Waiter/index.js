import React from "react";
import waiterImg from "images/waiter.png";
import styled from "styled-components";

const StyleWrapper = styled.div`
    overflow: hidden;
    width: 7rem;
    margin: 30px auto;
    .hd {
        float: left;
        margin-right: 10px;
        display: flex;
        align-items: center;
        img {
            width: 1.1067rem;
            height: 1.1333rem;
        }
    }
    .bd {
        overflow: hidden;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .telephone {
            width: 100%;
            background-color: #f6d2c5;
            color: #ff4500;
            font-size: 0.3733rem;
            line-height: 0.8267rem;
            height: 0.8267rem;
            border-radius: 0.4133rem;
        }
        .text {
            font-size: 12px;
            color: #ff4500;
        }
    }
`;

const Waiter = ({ telephone, time }) => {
    return (
        <StyleWrapper>
            <div className="hd">
                <img src={waiterImg} alt="" />
            </div>
            <div className="bd">
                <div className="telephone">{telephone}</div>
                <div className="text"> 有问题联系在线客服 <span dangerouslySetInnerHTML={{__html: time}}></span></div>
            </div>
        </StyleWrapper>
    );
};

export default Waiter;
