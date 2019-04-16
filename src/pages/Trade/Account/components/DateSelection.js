import React from "react";
import styled from "styled-components";
import DateItem from "./DateItem";
import gutter from "images/qiehuan@2x.png";
import { getDateStr } from "../../../../util";
import { DatePicker } from "antd-mobile";
const StyleWrapper = styled.div`
    background-color: #fff;
    padding: 15px 0 0;
`;
const DatePickerWrapper = styled.div`
    padding: 0 15px 10px;
    display: flex;
    background-color: #fff;
    align-items: center;
    & > div:not(.gutter) {
        flex: 1;
    }
    .gutter {
        width: 0.5rem;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
`;

const DateSelection = ({ onBeginChange, onEndChange, beginDate, endDate }) => {
    return (
        <StyleWrapper>
            <DatePickerWrapper>
                <DatePicker mode="date" onChange={onBeginChange}>
                    <DateItem label="开始时间" value={getDateStr(beginDate)} />
                </DatePicker>
                <div className="gutter">
                    <img src={gutter} alt="gutter" />
                </div>
                <DatePicker mode="date" onChange={onEndChange}>
                    <DateItem label="结束时间" value={getDateStr(endDate)} />
                </DatePicker>
            </DatePickerWrapper>
        </StyleWrapper>
    );
};

export default DateSelection;
