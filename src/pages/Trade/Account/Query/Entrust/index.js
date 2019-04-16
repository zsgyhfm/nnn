import React, { Component } from "react";
import TableItem from "./TableItem";
import withQueryPage from "../components/withQueryPage";
import * as api from "api";
import round from "lodash/round";
const fields = [
    { label: "名称/委托价" },
    { label: "委托量/成交量" },
    { label: "时间" },
    { label: "操作" }
];
export default withQueryPage(Component, {
    pageTitle: "委托记录",
    fields,
    url: api.ENTRUST,
    handleItem: item => {
        return (
            <TableItem
                key={item.id}
                name={item.gupiao_name}
                price={item.trust_price}
                amount={round(item.trust_count)}
                volume={round(item.volume)}
                time={{
                    date: item.trust_date,
                    time: item.trust_time
                }}
                bussinessName={item.flag2}
                status={item.status}
            />
        );
    }
});
