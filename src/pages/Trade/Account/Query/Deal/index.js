import React, { Component } from "react";
import TableItem from "./TableItem";
import withQueryPage from "../components/withQueryPage";
import * as api from "api";
import { getDateStr } from "../../../../../util";

const fields = [
    { label: "名称/成交价" },
    { label: "成交金额/成交量" },
    { label: "时间" },
    { label: "操作" }
];
export default withQueryPage(Component, {
    pageTitle: "成交记录",
    TableItem,
    fields,
    url: api.DEAL_LIST,
    handleItem: item => {
        return (
            <TableItem
                key={item.id}
                name={item.gupiao_name}
                price={item.deal_price}
                amount={parseFloat(item.trust_count)}
                volume={item.amount}
                time={
                    getDateStr(new Date(item.deal_date * 1000)) +
                    " " +
                    item.deal_time
                }
                status={item.status}
            />
        );
    }
});
