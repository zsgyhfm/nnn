import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon, WingBlank, Button, WhiteSpace, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "components/NavBar";
import MoneyField from "./MoneyField";
import BankCardSelect from "./BankCardSelect";
import PaypassField from "./PaypassField";
import * as api from "api";
import axios from "axios";
import Validator from "Validator";
const pageTitle = "申请提现";

class Withdraw extends PureComponent {
    constructor(props) {
        super(props);
        this._fetchPageData(props.token, props.history);
        this.moneyRef = React.createRef();
        this.paypassRef = React.createRef();
    }

    state = {
        banks: [],
        allBanks: [],
        selectedBank: {},
        maxMoney: 0
    };
    _fetchPageData = (token, history) => {
        axios.post(`${api.WITHDRAW}`, { token }).then(res => {
            if (res.data.status === "1") {
                const {
                    banks,
                    money,
                    bankSetting,
                    default_bank
                } = res.data.data;
                this.setState({
                    allBanks: bankSetting,
                    banks: banks.map(item => ({
                        value: item.id,
                        bank: item.bank,
                        card: item.card,
                        id: item.id,
                        label: `${bankSetting[item.bank]} | ${item.card}`
                    })),
                    maxMoney: money.account,
                    selectedBank: default_bank
                });
            } else {
                Toast.fail(res.data.message, 2, () => {
                    history.push("/member/index");
                });
            }
        });
    };

    onSelectCard = cardIndex => {
        const { banks } = this.state;
        const seletedCard = banks.find(
            item => item.id === parseInt(cardIndex, 10)
        );
        this.setState({
            selectedBank: {
                value: seletedCard.id,
                bank: seletedCard.bank,
                card: seletedCard.card,
                id: seletedCard.id
            }
        });
    };
    onSubmit = () => {
        const { token, history } = this.props;

        const card = this.state.selectedBank.id || null;
        const money = this.moneyRef.current.moneyRef.value;
        const paypass = this.paypassRef.current.passRef.value;
        if (!this._checkForm(card, money, paypass)) return false;

        axios
            .post(`${api.DO_WITHDRAW}`, {
                token,
                money,
                paywd: paypass,
                bank_id: card
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success("申请提现成功", 1, () => {
                        history.push("/member/index");
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };
    _checkForm = (card, money, paypass) => {
        if (!card) {
            Toast.info("请选择要提现的银行卡", 1, null, false);
            return false;
        }
        if (money === "") {
            Toast.info("请输入要提现的金额", 1, null, false);
            return false;
        }
        if (money > this.state.maxMoney) {
            Toast.info("提现金额超出账户可用余额", 1, null, false);
            return false;
        }
        if (!Validator.money(money)) {
            Toast.info("提现金额输入有误", 1, null, false);
            return false;
        }
        if (!Validator.paypass(paypass)) {
            Toast.info("支付密码输入有误", 1, null, false);
            return false;
        }
        return true;
    };
    render() {
        const { selectedBank, allBanks, banks, maxMoney } = this.state;
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Icon
                                type="left"
                                style={{ width: "30px", height: "30px" }}
                            />
                        }
                        onLeftClick={() => window.history.go(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <WingBlank>
                        <BankCardSelect
                            onSelectItem={item => this.onSelectCard(item)}
                            items={banks}
                        >
                            <Button>
                                {selectedBank.id
                                    ? `${allBanks[selectedBank.bank]} | ${
                                          selectedBank.card
                                      }`
                                    : "请选择提现银行卡"}
                                <Icon type="down" size="xxs" />
                            </Button>
                        </BankCardSelect>
                        <MoneyField maxMoney={maxMoney} ref={this.moneyRef} />
                        <PaypassField ref={this.paypassRef} />
                        <WhiteSpace size="xl" />
                        <Button
                            type="primary"
                            style={{ background: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            提交提现申请
                        </Button>
                    </WingBlank>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});

export default withRouter(connect(mapStateToProps)(Withdraw));
