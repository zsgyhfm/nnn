import React, { Component } from "react";
import styled from "styled-components";
import { Button, WhiteSpace, Toast, Modal } from "antd-mobile";
import TextPrimary from "components/Text/TextPrimary";
import round from "lodash/round";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as api from "api";
import { getSubAccountMoney } from "actions/trade";
import PriceGroup from "./PriceGroup";
import AmountGroup from "./AmountGroup";
import Validator from "Validator";

const StyleWrapper = styled.div`
    margin: 10px 15px;
`;

const MoneyCost = styled.div`
    display: flex;
    justify-content: space-between;
    line-height: 30px;
`;

class StockPriceBar extends Component {
    state = {
        tradeType: 1,
        price: "--",
        amount: "",
        sellOnePrice: "--",
        quickAmountActive: ""
    };

    static getDerivedStateFromProps = (props, states) => {
        if (props.stock) {
            if (props.stock.sell_one_price !== states.sellOnePrice) {
                return {
                    sellOnePrice:
                        props.stock.sell_one_price === "0.00"
                            ? props.stock.current_price
                            : props.stock.sell_one_price,
                    price:
                        props.stock.sell_one_price === "0.00"
                            ? props.stock.current_price
                            : props.stock.sell_one_price
                };
            }
        }
        return null;
    };

    componentDidMount() {
        this._isMount = true;
    }
    componentWillUnmount = () => {
        this._isMount = false;
    };

    onSubmit = () => {
        const stockName = this.props.stock.name;
        const that = this;
        Modal.alert("买入", `确认要买入${stockName}股票吗？`, [
            { text: "取消" },
            { text: "确定", onPress: that.doSubmit }
        ]);
    };
    doSubmit = () => {
        const { token, code, subAccount, reloadAccountMoney } = this.props;
        const { tradeType, price, amount } = this.state;
        if (!this._checkSubmit(code, amount, tradeType, price)) return;
        axios
            .post(`${api.BUY_STOCK}`, {
                token,
                code,
                count: amount,
                model: tradeType,
                price: tradeType === 1 ? price : null,
                id: subAccount.id
            })
            .then(res => {
                if (this._isMount && res.data.status === 1) {
                    reloadAccountMoney(token, subAccount.id);
                    // reset buy form
                    this.setState({
                        amount: ""
                    });
                    // update position table
                    this.props.updatePosition && this.props.updatePosition();
                    Toast.success(res.data.message, 1.5);
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };
    _checkSubmit = (code, amount, tradeType, price) => {
        if (tradeType === 1) {
            const maxPrice = round(this.props.stock.yesterday_price * 1.1, 2);
            const minPrice = round(this.props.stock.yesterday_price * 0.9, 2);
            if (!Validator.money(price)) {
                return Toast.info("委托价格输入有误", 1, null, false);
            }
            if (price > maxPrice) {
                return Toast.info("委托价格超过涨停价", 1, null, false);
            }
            if (price < minPrice) {
                return Toast.info("委托价格低于跌停价", 1, null, false);
            }
        }
        if (!code) return Toast.info("数据有误，请稍后", 1, null, false);
        if (amount === 0 || amount === "") {
            return Toast.info("请输入买入股数", 1, null, false);
        }
        if (!Validator.integer(amount)) {
            return Toast.info("买入股数有误", 1, null, false);
        }
        if (amount % 100 !== 0) {
            return Toast.info("买入股数必须是100的整数倍", 1, null, false);
        }
        const maxAmount =
            Math.floor(this.props.accountMoney / price / 100) * 100;
        if (amount > maxAmount) {
            return Toast.info("买入股数超过最大可买数", 1, null, false);
        }

        return true;
    };
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onChangeTradeType = type => {
        this.setState({
            tradeType: type,
            price:
                type === 1
                    ? this.props.stock
                        ? this.props.stock.sell_one_price
                        : "--"
                    : "按市价即时成交"
        });
    };
    onDecreasePrice = () => {
        const { yesterdayPrice } = this.props;
        if (yesterdayPrice === "--") return;
        if (this.state.price > round(yesterdayPrice * 0.9, 2)) {
            this.setState({
                price: round(+this.state.price - 0.01, 2).toFixed(2)
            });
        }
    };

    onIncreasePrice = () => {
        const { yesterdayPrice } = this.props;
        if (yesterdayPrice === "--") return;
        if (this.state.price < round(yesterdayPrice * 1.1, 2)) {
            this.setState({
                price: round(+this.state.price + 0.01, 2).toFixed(2)
            });
        }
    };

    onAmountBlur = e => {
        this.setState({
            amount: Validator.integer(e.target.value)
                ? Math.floor(e.target.value / 100) * 100
                : 0
        });
    };
    onIncreaseAmount = e => {
        const { accountMoney, code } = this.props;
        const price = this.state.price;
        if (!code) return;
        const maximum = Math.floor(accountMoney / price / 100) * 100;
        if (this.state.amount >= maximum) return;
        this.setState({
            amount: this.state.amount ? this.state.amount + 100 : 100,
            quickAmountActive: 0
        });
    };
    onDecreaseAmount = e => {
        const { code } = this.props;
        if (!code) return;
        if (this.state.amount <= 0) return;
        this.setState({
            amount: this.state.amount ? this.state.amount - 100 : 0,
            quickAmountActive: 0
        });
    };
    quickAmount = value => {
        const { code } = this.props;
        if (!code) return;
        const { accountMoney } = this.props;
        const price = this.state.price;
        const maximum = Math.floor(accountMoney / price / 100) * 100;

        this.setState({
            amount: Math.floor(maximum / value / 100) * 100,
            quickAmountActive: value
        });
    };

    render() {
        const { accountMoney, currentPrice, stock } = this.props;
        const { tradeType, price, quickAmountActive, amount } = this.state;
        console.log("amount==",amount)
        console.log("price==",price)
        return (
            <StyleWrapper>
                <PriceGroup
                    yesterdayPrice={stock ? stock.yesterday_price : "--"}
                    price={price}
                    tradeType={tradeType}
                    onChangeTradeType={this.onChangeTradeType}
                    onChange={this.onInputChange}
                    onIncreasePrice={this.onIncreasePrice}
                    onDecreasePrice={this.onDecreasePrice}
                />
                <WhiteSpace />
                <AmountGroup
                    currentPrice={currentPrice}
                    amount={amount}
                    maxCanBuy={
                        accountMoney && price
                            ? round(
                                  Math.floor(accountMoney / price / 100) * 100
                              )
                            : 0
                    }
                    code={stock ? stock.code : ""}
                    onAmountBlur={this.onAmountBlur}
                    onAmountChange={this.onAmountChange}
                    onIncreaseAmount={this.onIncreaseAmount}
                    onDecreaseAmount={this.onDecreaseAmount}
                    quickAmountActive={quickAmountActive}
                    quickAmount={this.quickAmount}
                    onChange={this.onInputChange}
                />

                <MoneyCost>
                    <div>
                        委托金额：
                        <TextPrimary>
                            {tradeType==1?`${price && amount ? round(price * amount) : "--"}`:price+"计算"}
                        </TextPrimary>
                    </div>
                    <div>
                        可用资金：
                        <TextPrimary>{accountMoney}</TextPrimary>
                    </div>
                </MoneyCost>
                <Button
                    type="primary"
                    disabled={this.props.code ? false : true}
                    onClick={this.onSubmit}
                    style={{ background: "#FF4500" }}
                >
                    买入
                </Button>
            </StyleWrapper>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token,
    subAccount: state.subAccount,
    accountMoney: state.accountMoney.avail || 0
});

const mapDispatchToProps = dispatch => ({
    reloadAccountMoney: (token, id) => {
        dispatch(getSubAccountMoney(token, id));
    }
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StockPriceBar)
);
