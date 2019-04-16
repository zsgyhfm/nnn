import React from "react";
import TableTimeFormat from "components/Table/TableTimeFormat";
import styled from "styled-components";
const StyleWrapper = styled.tr`
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
    &&& td {
        @media (max-width: 320px) {
            font-size: 11px;
        }
    }
`;
const TableItem = ({ name, price, volume, amount, time, fee, status }) => {
    return (
        <StyleWrapper>
            <td>
                {name}
                <div>{price}</div>
            </td>
            <td>
                {amount}
                <div>{volume}</div>
            </td>
            <td>
                <TableTimeFormat time={time} />
            </td>
            <td>
                {status}
                <div>{fee}</div>
            </td>
        </StyleWrapper>
    );
};

export default TableItem;
