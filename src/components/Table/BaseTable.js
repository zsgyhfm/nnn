import React from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    tbody td {
        background-color: #fff;
        padding: 5px 3px;
        line-height: 1.2;
        color: #252525;
        font-size: 14px;
    }
    tfoot td.empty {
        padding: 20px 0;
    }
`;

const Th = styled.th`
    padding: 0 10px;
    font-weight: normal;
    color: #8e8e93;
    font-size: 13px;
    line-height: 35px;
    background-color: #f3f7ff;
    text-align: ${props => (props.align ? props.align : "center")};
    @media(max-width: 320px){
        font-size: 11px;
    }
`;

const BaseTable = ({ fields, ...rest }) => {
    return (
        <Table>
            <TableHead fields={fields} />
            <TableBody fields={fields} {...rest} />
        </Table>
    );
};

export default BaseTable;

const TableHead = ({ fields }) => {
    return (
        <thead>
            <tr>
                {fields.map((item, index) => {
                    const { ...data } = item;
                    return (
                        <Th {...data} key={index}>
                            {item.label}
                        </Th>
                    );
                })}
            </tr>
        </thead>
    );
};

const TableBody = ({ fields, lists, empty: Empty, loading, children }) => {
    if (lists.length === 0) {
        return (
            <tfoot>
                <tr>
                    <td colSpan={fields.length} className="empty">
                        {loading ? <Icon type="loading" /> : Empty ? <Empty /> : "暂无数据"}
                    </td>
                </tr>
            </tfoot>
        );
    } else {
        return (
            <tbody>
                {lists.map(item => {
                    return children(item);
                })}
            </tbody>
        );
    }
};
