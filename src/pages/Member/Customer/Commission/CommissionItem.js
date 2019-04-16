import React from "react";
import styled from "styled-components";
import TableTimeFormat from "components/Table/TableTimeFormat";

const StyleWrapper = styled.tr`
    td {
        padding: 10px 0;
        line-height: 1.5;
        border-bottom: 1px solid #e8e8e8;
        color: #252525;
    }
`;

const CommissionItem = ({ time, info, money }) => {
    return (
        <StyleWrapper>
            <td><TableTimeFormat time={time}></TableTimeFormat></td>
            <td width="45%">{info}</td>
            <td>{money}</td>
        </StyleWrapper>
    );
};
export default CommissionItem;
