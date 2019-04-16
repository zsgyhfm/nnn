import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyleWrapper = styled(Link)`
    display: flex;
    color: #3b3b3b;
    margin: 10px 0;
    padding: 0 15px;
    .left {
        display: inline-flex;
        align-items: center;
        flex: 1;
        font-size: 15px;
    }
    .middle {
        flex: 1;
        padding-left: 10%;
        line-height: 1.2;
    }
    .right {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-basis: 25%;
    }
`;

const Item = ({ name, code, title,stock, rate }) => {
    return (
        <StyleWrapper
            to={{
                pathname: `/trade/market/bankuai/${code}`,
                state: {
                    pageTitle: title
                }
            }}
        >
            <div className="left">
                <span>{name}</span>
            </div>
            <div className="middle">
                <div className="name">{stock.name}</div>
                <div className="code">{stock.code.substr(2)}</div>
            </div>
            <div className="right">
                <RateBtn base={rate}>{rate}%</RateBtn>
            </div>
        </StyleWrapper>
    );
};
export default Item;

const RateBtn = styled.div`
    display: inline-block;
    width: 60px;
    font-size: 12px;
    color: #ffffff;
    background: ${props =>
        props.base > 0 ? "#FF4500" : props.base < 0 ? "#05AA3B" : "#ccc"};
    border-radius: 5px;
    line-height: 25px;
    text-align: center;
`;
