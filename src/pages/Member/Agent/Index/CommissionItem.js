import React from "react";
import styled from "styled-components";
import TableTimeFormat from "components/Table/TableTimeFormat";

const StyleWrapper = styled.div`
    display: flex;
    .item {
        padding: 10px 5px;
        line-height: 1.5;
        border-bottom: 1px solid #e8e8e8;
        color: #252525;
        text-align: center;
        &:first-child {
            flex-basis: 25%;
        }
        &:nth-child(2) {
            flex-basis: 55%;
        }
        &:last-child {
            flex-basis: 20%;
        }
    }
    .info {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;

const CommissionItem = ({ time, info, money, viewMore }) => {
    return (
        <StyleWrapper onClick={() => viewMore(info)}>
            <div className="item">
                <TableTimeFormat time={time} />
            </div>
            <div className="item">
                <div className="info">{info}</div>
            </div>
            <div className="item">{money}</div>
        </StyleWrapper>
    );
};
export default CommissionItem;
