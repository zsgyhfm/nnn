import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
const StyleWrapper = styled(Link)`
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
    align-items: center;
    .name {
        font-size: 14px;
        color: #252525;
        flex: 1;
        .code{
            color: #8e8e93;
        }
    }
    .price{
        color: #252525;
        flex: 1;
        text-align: center; 
    }
    .rate {
        font-size: 16px;
        text-align: right;
        line-height: 1.2;
        flex: 1
    }
`;
const HotPalateItem = ({ code, rate, name, price }) => {
    return (
        <StyleWrapper to={`/trade/stock/${code}`}>
            <div className="name">
                <div>{name}</div>
                <div className="code">{code}</div>
            </div>
            <div className="price">{price}</div>
            <div className="rate">
                <RateBtn base={rate}>{rate}%</RateBtn>
            </div>
        </StyleWrapper>
    );
};

export default HotPalateItem;

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
