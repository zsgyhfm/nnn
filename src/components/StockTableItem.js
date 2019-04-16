import React from "react";
import {getStockUpDown} from "../util"
const getStockPriceRate = (yesterdayPrice, nowPrice) => {
    return (
        ((nowPrice - yesterdayPrice) / yesterdayPrice * 100).toFixed(2) + "%"
    );
};
const StockTableItem = ({ stock, onClick }) => {
    const upOrDown =getStockUpDown(stock.current_price, stock.yesterday_price);

    return (
        <tr onClick={() => onClick(stock.code)}>
            <td align="left">
                <div>{stock.name}</div>
                <div>{stock.code}</div>
            </td>
            <td align="right">
                <div className={upOrDown}>{stock.current_price}</div>
            </td>
            <td align="right">
                <div className={upOrDown}>
                    {getStockPriceRate(
                        stock.yesterday_price,
                        stock.current_price
                    )}
                </div>
            </td>
        </tr>
    );
};

export default StockTableItem;
