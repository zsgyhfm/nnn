import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.tr`
    td {
        padding: 10px 0;
        border-bottom: 1px solid #e8e8e8;
    }
`;

const TableItem = ({
    name,
    price,
    amount,
    volume,
    time,
    bussinessName,
    status
}) => {
    console.log(time)
    return (
        <StyleWrapper>
            <td>
                {name}
                <br />
                {price}
            </td>
            <td>
                {amount}
                <br />
                {volume}
            </td>
            <td>
                {time.date}
                <div>{time.time}</div>
            </td>
            <td>
                {bussinessName} <br />
                {status}
            </td>
        </StyleWrapper>
    );
};

export default TableItem;
