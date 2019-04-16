import React from "react";
import styled from "styled-components";
import { numberFormat } from "../../../util";

const StyleWrapper = styled.div`
    width: 30%;
    background-color: #fff;
    color: #8e8e93;
    font-size: 14px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 15px;
    padding: 20px 0;
    border: 1px solid #eaeaea;
    &.active {
        border-color: #ff4500;
        color: #ff4500;
        .hd {
            color: inherit;
        }
    }
    .hd {
        font-size: 18px;
        line-height: 30px;
        color: #252525;
    }
    .num {
        font-size: 16px;
        line-height: 20px;
    }
`;

const DisableWrapper = styled(StyleWrapper)`
    width: 30%;
    background-color: #e8e8e8;
    color: #8e8e93;
    font-size: 14px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 15px;
    padding: 20px 0;
    .hd {
        color: #8e8e93;
    }
    .num {
        font-size: 16px;
        line-height: 20px;
    }
`;

const RatioSelectable = ({ ratio, active, money, onSelect }) => {
    return (
        <StyleWrapper className={active ? "active" : null} onClick={() => onSelect(ratio)}>
            <div className="hd">{numberFormat(ratio * money)}</div>
            <div className="num">{ratio}倍</div>
        </StyleWrapper>
    );
};

const RatioUnSelectable = ({ ratio }) => {
    return (
        <DisableWrapper>
            <div className="hd">配资金额</div>
            <div className="num">{ratio}倍</div>
        </DisableWrapper>
    );
};

const RatioItem = ({ ratio, money, ...props }) => {
    return money ? (
        <RatioSelectable money={money} ratio={ratio} {...props} />
    ) : (
        <RatioUnSelectable ratio={ratio} />
    );
};

export default RatioItem;
