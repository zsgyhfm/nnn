import React from "react";

import TabBarNav from "components/TabBarNav";

const naves = [
    {
        title: "买入",
        link: "/trade/buy"
    },
    {
        title: "卖出",
        link: "/trade/sell/"
    },
    {
        title: "撤单",
        link: "/trade/account/cancel"
    },
    {
        title: "持仓",
        link: "/trade/account/position"
    },
    {
        title: "查询",
        link: "/trade/account/query/index"
    }
];
const TradeNav = () => {
    return <TabBarNav items={naves} />
    
};

export default TradeNav;
