import React, { Component } from "react";
import TableItem from "./TableItem";
import withQueryPage from "../components/withQueryPage";
import * as api from "api";
import { getTimeStr } from "../../../../../util";
import round from "lodash/round";

const fields = [
    { label: "名称/成交价" },
    { label: "成交金额/成交量" },
    { label: "时间" },
    { label: "操作/手续费" }
];

export default withQueryPage(Component, {
    pageTitle: "交割查询",
    TableItem,
    fields,
    url: api.DELIVERY_LIST,
    handleItem: item => {
        return (
            <TableItem
                key={item.id}
                id={item.id}
                name={item.gupiao_name}
                price={item.deal_price}
                amount={round(item.volume * item.deal_price, 2)}
                volume={item.volume}
                fee={round(
                    parseFloat(item.commission) +
                        parseFloat(item.transfer_fee) +
                        parseFloat(item.stamp_duty),
                    2
                )}
                time={ getTimeStr(new Date(item.deal_date * 1000))}
                status={item.business_name}
            />
        );
    }
});
