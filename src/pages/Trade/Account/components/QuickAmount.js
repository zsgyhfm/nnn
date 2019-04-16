import React from "react";
import styled from "styled-components";
const StyleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    .item {
        width: 20%;
        line-height: 24px;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
      
        &.sell {
            color: #05aa3b;
            border: 1px solid #05aa3b;
        }
        &.buy {
            color: #ff4500;
            border: 1px solid #ff4500;
        }  
        &.active{
            color: #ffffff;
        }
        &.buy.active {            
            background-color: #ff4500;
        }
        &.sell.active {            
            background-color: #05aa3b;
        }
    }
`;
const QuickAmount = props => {
    return (
        <StyleWrapper>
            {amountTypes.map(item => (
                <Item
                    key={item.value}
                    value={item.value}
                    text={item.text}
                    {...props}
                />
            ))}
        </StyleWrapper>
    );
};

export default QuickAmount;

const amountTypes = [
    { text: "全仓", value: 1 },
    { text: "1 / 2", value: 2 },
    { text: "1 / 3", value: 3 },
    { text: "1 / 4", value: 4 }
];
const Item = ({ text, value, onClick, active,type }) => {
    return (
        <div
            className={`item ${active === value ? "active" : ""} ${type}`}
            onClick={() => onClick(value)}
        >
            {text}
        </div>
    );
};