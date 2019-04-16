import React from "react";
import TableTimeFormat from "components/Table/TableTimeFormat";

const TableItem = ({ name, price, volume, amount, time, status }) => {
    return (
        <tr>
            <td>
                {name}
                <div>{price}</div>
            </td>
            <td>
                {volume}
                <div>{amount}</div>
            </td>
            <td>
                <TableTimeFormat time={time} />
            </td>
            <td>{status}</td>
        </tr>
    );
};

export default TableItem;
