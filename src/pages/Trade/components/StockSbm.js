import React from "react";
import styled from "styled-components";
import StockColorText from "components/Text/StockColorText";

const StyleWrapper = styled.div`
    background-color: #fff;
    margin-top: 10px;
    padding: 0 15px;
    display: flex;
`;

const StockSbm = ({ stock }) => {
    const buyInfo = [
        {
            id: 1,
            title: "买一",
            price: stock ? stock.buy_one_price : "--",
            amount: stock ? stock.buy_one_amount : "--"
        },
        {
            id: 2,
            title: "买二",
            price: stock ? stock.buy_two_price : "--",
            amount: stock ? stock.buy_two_amount : "--"
        },
        {
            id: 3,
            title: "买三",
            price: stock ? stock.buy_three_price : "--",
            amount: stock ? stock.buy_three_amount : "--"
        },
        {
            id: 4,
            title: "买四",
            price: stock ? stock.buy_four_price : "--",
            amount: stock ? stock.buy_four_amount : "--"
        },
        {
            id: 5,
            title: "买五",
            price: stock ? stock.buy_five_price : "--",
            amount: stock ? stock.buy_five_amount : "--"
        }
    ];

    const sellInfo = [
        {
            id: 1,
            title: "卖一",
            price: stock ? stock.sell_one_price : "--",
            amount: stock ? stock.sell_one_amount : "--"
        },
        {
            id: 2,
            title: "卖二",
            price: stock ? stock.sell_two_price : "--",
            amount: stock ? stock.sell_two_amount : "--"
        },
        {
            id: 3,
            title: "卖三",
            price: stock ? stock.sell_three_price : "--",
            amount: stock ? stock.sell_three_amount : "--"
        },
        {
            id: 4,
            title: "卖四",
            price: stock ? stock.sell_four_price : "--",
            amount: stock ? stock.sell_four_amount : "--"
        },
        {
            id: 5,
            title: "卖五",
            price: stock ? stock.sell_five_price : "--",
            amount: stock ? stock.sell_five_amount : "--"
        }
    ];
    return (
        <StyleWrapper>
            <Unit
                title="买盘档"
                items={buyInfo}
                yesterdayPrice={stock ? stock.yesterday_price : 0}
            />
            <Unit
                title="卖盘档"
                items={sellInfo}
                yesterdayPrice={stock ? stock.yesterday_price : 0}
            />
        </StyleWrapper>
    );
};
export default StockSbm;

const UnitWrapper = styled.div`
    flex: 1;
    color: #8e8e93;
    &:first-child {
        padding-right: 10px;
    }
    &:last-child {
        padding-left: 10px;
    }
    .hd {
        line-height: 40px;
        text-align: center;
        color: #252525;
        font-size: 14px;
        border-bottom: 1px solid #f4f4f4;
    }
`;
const Unit = ({ title, items, ...rest }) => {
    return (
        <UnitWrapper>
            <div className="hd">{title}</div>
            <div className="bd">
                <Info items={items} {...rest} />
            </div>
        </UnitWrapper>
    );
};

const Info = ({ items, ...rest }) => {
    return items.map(item => (
        <Item
            key={item.id}
            title={item.title}
            price={item.price}
            amount={item.amount}
            {...rest}
        />
    ));
};
const ItemWrapper = styled.div`
    display: flex;
    line-height: 30px;
    span {
        flex: 1;
        text-align: center;
        &:first-child {
            text-align: left;
        }
        &:last-child {
            text-align: right;
        }
    }
`;
const Item = ({ title, price, amount, yesterdayPrice }) => {
    return (
        <ItemWrapper>
            <span>{title}</span>
            <span>
                <StockColorText base={price - yesterdayPrice}>
                    {price !== null ? price : "--"}
                </StockColorText>
            </span>
            <span>{amount !== null ? amount : "--"}</span>
        </ItemWrapper>
    );
};
