import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyleWrapper = styled.div`
    margin-top: 20px;
    background-color: #fff;
    padding: 0 15px;
    .title {
        font-size: 14px;
        color: #8e8e93;
        line-height: 40px;
    }
    .bd {
        display: flex;
        flex-wrap: wrap;
    }
`;
const HotSearchList = ({ lists }) => {
    return (
        <StyleWrapper>
            <div className="title">大家都在搜</div>
            <div className="bd">
                {lists.map((item, index) => (
                    <HotSearchItem
                        key={item.id}
                        item={item}
                        index={index + 1}
                    />
                ))}
            </div>
        </StyleWrapper>
    );
};

export default HotSearchList;

const HotSearchItem = ({ item, index }) => {
    return (
        <ItemStyle className="item" to={`/trade/stock/${item.code}`}>
            <div className={`index item-${index}`}>{index}</div>
            <div className="title">{item.code_title}</div>
            <div className="code">{item.code}</div>
        </ItemStyle>
    );
};

const ItemStyle = styled(Link)`
    width: 33.33333%;
    border-bottom: 1px solid #dddddd;
    position: relative;
    padding: 10px 0 10px 25px;
    .index {
        position: absolute;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
        background-color: #bbbbbe;
        left: 0;
        top: 10px;
        &.item-1 {
            background-color: #ff4500;
        }
        &.item-2 {
            background-color: #ff7043;
        }
        &.item-3 {
            background-color: #fbc02d;
        }
    }
    .title {
        font-size: 14px;
        line-height: 1.2;
        color: #252525;
    }
    .code {
        font-size: 12px;
        line-height: 1.2;
        color: #8e8e93;
    }
`;
