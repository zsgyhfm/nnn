import React from "react";
import StockItem from "./StockItem";

const SearchList = ({ stocks, ...rest }) => {
    return (
        <ul>
            {stocks.map(item => (
                <StockItem key={item.code} stock={item} {...rest} />
            ))}
        </ul>
    );
};

export default SearchList;
