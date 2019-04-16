import React, { Component } from "react";
import styled from "styled-components";
import { Button, WhiteSpace, Toast, Modal } from "antd-mobile";
import TextPrimary from "components/Text/TextPrimary";
import Validator from "Validator";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as api from "api";
import { getSubAccountMoney } from "actions/trade";
import PriceGroup from "./PriceGroup";
import AmountGroup from "./AmountGroup";
import round from "lodash/round";

const StyleWrapper = styled.div`
    margin: 10px 15px;
`;

class StockPriceBar extends Component {
    state = {
        price: "",
        tradeType: 1,
        amount: "",
        maxSellAmount: "",
        quickAmountActive: 0
    };
    componentDidMount() {
        this._isMount = true;
    }
    componentWillUnmount = () => {
        this._isMount = false;
    };
    componentDidUpdate(prevProps) {
        if (prevProps.stock === null) {
            if (this.props.stock && this.props.stock.code) {
                this._fetchMaxSellAmount();
                this.setState({
                    price:
                        this.props.stock.buy_one_price === "0.00"
                            ? round(this.props.stock.current_price, 2)
                            : round(this.props.stock.buy_one_price, 2)
                });
            }
        } else if (this.props.stock.code !== prevProps.stock.code) {
            this._fetchMaxSellAmount();
            this.setState({
                price:
                    this.props.stock.buy_one_price === "0.00"
                        ? round(this.props.stock.current_price, 2)
                        : round(this.props.stock.buy_one_price, 2)
            });
        }
    }
    onSubmit = () => {
        const stockName = this.props.stock.name;
        const that = this;
        Modal.alert("卖出", `确认要卖出${stockName}股票吗？`, [
            { text: "取消" },
            { text: "确定", onPress: that.doSubmit }
        ]);
    };
    doSubmit = () => {
        const { token, code, subAccount, reloadAccountMoney } = this.props;
        const { price, tradeType, amount } = this.state;
        if (!this._checkSubmit(price, tradeType, code, amount)) return;
        axios
            .post(`${api.SELL_STOCK}`, {
                token,
                code,
                count: amount,
                price: tradeType === 1 ? price : null,
                model: tradeType,
                id: subAccount.id
            })
            .then(res => {
                if (this._isMount && res.data.status === 1) {
                    reloadAccountMoney(token, subAccount.id);
                    // reset sell form
                    this.setState({
                        amount: "",
                        quickAmountActive: 0
                    });
                    this.props.noticeReloadPosition();
                    this._fetchMaxSellAmount();
                    // update position table
                    this.props.updatePosition && this.props.updatePosition();
                    Toast.success(res.data.message, 1.5);
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };

    _checkSubmit = (price, tradeType, code, amount) => {
        const maxPrice = round(this.props.stock.yesterday_price * 1.1, 2);
        const minPrice = round(this.props.stock.yesterday_price * 0.9, 2);
        if (!code) return Toast.info("数据有误，请稍后", 1, null, false);
        if (tradeType === 1) {
            if (!Validator.money(price))
                return Toast.info("委托价格输入有误", 1, null, false);
            if (price > maxPrice) {
                return Toast.info("委托价格不能高于涨停价", 1, null, false);
            }
            if (price < minPrice) {
                return Toast.info("委托价格不能低于跌停价", 1, null, false);
            }
        }
        if (amount === 0 || amount === "") {
            return Toast.info("请输入卖出股数", 1, null, false);
        }
        if (!Validator.integer(amount)) {
            return Toast.info("卖出股数有误", 1, null, false);
        }

        if (amount % 100 !== 0) {
            return Toast.info("卖出股数必须是100的整数倍", 1, null, false);
        }
        return true;
    };

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onDecreasePrice = () => {
        const yesterdayPrice = this.props.stock.yesterday_price;
        if (yesterdayPrice === "--") return;
        if (this.state.price > round(yesterdayPrice * 0.9, 2)) {
            this.setState({
                price: round(+this.state.price - 0.01, 2).toFixed(2)
            });
        }
    };

    onIncreasePrice = () => {
        const yesterdayPrice = this.props.stock.yesterday_price || "--";
        if (yesterdayPrice === "--") return;
        if (this.state.price < round(yesterdayPrice * 1.1, 2)) {
            this.setState({
                price: round(+this.state.price + 0.01, 2)
            });
        }
    };
    onSelectTradeType = item => {
        const buyOnePrice = this.props.stock
            ? this.props.stock.buy_one_price
            : "";
        const type = +item.key;
        this.setState({
            popoverVisible: false,
            tradeType: type,
            price: type === 1 ? buyOnePrice : "按市价即时成交"
        });
    };
    _fetchMaxSellAmount = () => {
        const { token, subAccount, stock } = this.props;
        axios
            .post(`${api.CAN_SELL_AMOUNT}`, {
                token,
                code: stock.code,
                id: subAccount.id
            })
            .then(res => {
                if (this._isMount && res.data.status === 1) {
                    this.setState({
                        maxSellAmount: res.data.data
                    });
                }
            });
    };

    onIncreaseAmount = e => {
        const maximum = this.state.maxSellAmount;

        if (this.state.amount >= maximum) return;
        this.setState({
            amount: this.state.amount ? +this.state.amount + 100 : 100,
            quickAmountActive: 0
        });
    };
    onDecreaseAmount = e => {
        if (this.state.amount <= 0) return;
        this.setState({
            amount: this.state.amount ? this.state.amount - 100 : 0,
            quickAmountActive: 0
        });
    };
    quickChangeAmount = value => {
        const maximum = this.state.maxSellAmount;
        this.setState({
            amount: Math.floor(maximum / value / 100) * 100,
            quickAmountActive: value
        });
    };
    render() {
        const { accountMoney } = this.props;
        const {
            price,
            amount,
            tradeType,
            quickAmountActive,
            maxSellAmount
        } = this.state;
        const buyOnePrice = this.props.stock
            ? this.props.stock.buy_one_price
            : 0;

        return (
            <StyleWrapper>
                <PriceGroup
                    onChange={this.onInputChange}
                    price={price}
                    tradeType={tradeType}
                    onDecreasePrice={this.onDecreasePrice}
                    onIncreasePrice={this.onIncreasePrice}
                    onSelectTradeType={this.onSelectTradeType}
                />
                <WhiteSpace />
                <AmountGroup
                    onChange={this.onInputChange}
                    amount={amount}
                    maxSellAmount={maxSellAmount}
                    onIncreaseAmount={this.onIncreaseAmount}
                    onDecreaseAmount={this.onDecreaseAmount}
                    quickAmountActive={quickAmountActive}
                    quickChangeAmount={this.quickChangeAmount}
                />

                <MoneyCost>
                    <div>
                        委托金额：
                        <TextPrimary>
                            {price && amount
                                ? tradeType === 1
                                    ? round(price * amount)
                                    : round(buyOnePrice * amount)
                                : "--"}
                        </TextPrimary>
                    </div>
                    <div>
                        可用资金：
                        <TextPrimary>
                            {accountMoney !== undefined ? accountMoney : "--"}
                        </TextPrimary>
                    </div>
                </MoneyCost>
                <Button
                    type="primary"
                    disabled={this.props.code ? false : true}
                    onClick={this.onSubmit}
                    style={{ background: "#05aa3b" }}
                >
                    卖出
                </Button>
            </StyleWrapper>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token,
    subAccount: state.subAccount
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
const MoneyCost = styled.div`
    display: flex;
    justify-content: space-between;
    line-height: 30px;
`;
