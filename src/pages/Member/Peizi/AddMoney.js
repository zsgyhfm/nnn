import React, { Fragment } from "react";
import { Icon, WingBlank, Button, WhiteSpace, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as api from "api";
import { connect } from "react-redux";
import styled from "styled-components";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import OperateBar from "./components/OperateBar";
import ListGroup from "components/List/ListGroup";
import TextPrimary from "components/Text/TextPrimary";
import RecordTable from "components/RecordTable/";
import TextWithQuestionMark from "components/TextWithQuestionMark";
import ChargeButton from "./components/ChargeButton";
import TableTimeFormat from "components/Table/TableTimeFormat";
import Validator from "Validator";
import round from "lodash/round";
const pageTitle = "追加保证金";

class AddMoney extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            info: props.location.state.info,
            money: undefined,
            account: 0,
            records: [],
            recordLoading: false,
            subAccount: {
                available: 0,
                total: 0
            }
        };
    }
    componentDidMount() {
        this._fetchAccountMoney(this.props.token);
        this._fetchRecords();
        this._fetchSubAccountInfo();
    }

    _fetchSubAccountInfo() {
        axios
            .post(`${api.SUBACCOUNT_MONEY_INFO}`, {
                id: this.state.info.stock_subaccount_id,
                token: this.props.token
            })
            .then(res => {
                this.setState({
                    subAccount: {
                        loseCloseMoney: res.data.data.loss_close_money,
                        lossWarnMoney: res.data.data.loss_warn_money,
                        total: res.data.data.total_money
                    }
                });
            });
    }
    _fetchAccountMoney(token) {
        axios.post(`${api.ACCOUNT_MONEY}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    account: res.data.data.money.account
                });
            }
        });
    }
    _fetchRecords = () => {
        this.setState({
            recordLoading: true
        });
        const { token } = this.props;
        const { id } = this.props.match.params;
        axios
            .post(`${api.PEIZI_DETAIL}?id=${id}`, { token })
            .then(res => {
                if (res.data.status === "1") {
                    this.setState({
                        records: res.data.data.addmoney
                    });
                }
                this.setState({
                    recordLoading: false
                });
            })
            .catch(res => {
                this.setState({
                    recordLoading: false
                });
            });
    };

    onSubmit = () => {
        const { token } = this.props;
        const id = this.props.match.params.id;
        const { money } = this.state;
        if (!this._checkForm(money)) return false;

        axios.post(`${api.ADDMONEY_APPLY}`, { token, id, money }).then(res => {
            if (res.data.status === "1") {
                Toast.success(res.data.message, 1, () => {
                    this._fetchRecords();
                    this._fetchAccountMoney(token);
                });
            } else {
                Toast.fail(res.data.message);
            }
        });
    };
    _checkForm(money) {
        if (money === null || money === 0) {
            return Toast.info("请输入保证金金额", 1, null, false);
        }
        if (!Validator.money(money)) {
            return Toast.info("保证金金额必须正整数", 1, null, false);
        }
        return true;
    }
    onMoneyChange = e => {
        e.target.value = e.target.value.replace(/[^\d]/g, "");
        this.setState({
            money: parseInt(e.target.value || 0, 10)
        });
    };
    render() {
        const {
            money,
            records,
            recordLoading,
            account,
            subAccount
        } = this.state;
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
                        <OperateBar title="请输入追加保证金金额">
                            <InputBar
                                placeholder="请输入追加保证金金额"
                                onKeyUp={this.onMoneyChange}
                                onAfterPaste={this.onMoneyChange}
                            />
                        </OperateBar>
                        <ListGroup>
                            <ListGroup.Item
                                title={
                                    <TextWithQuestionMark
                                        info="总操盘资金低于平仓线后，持仓股票会被强制平仓"
                                        text="距离平仓线"
                                    />
                                }
                                align="right"
                            >
                                {money && subAccount
                                    ? round(
                                          money +
                                              subAccount.total -
                                              subAccount.loseCloseMoney,
                                          2
                                      )
                                    : subAccount.total
                                        ? round(
                                              subAccount.total -
                                                  subAccount.loseCloseMoney,
                                              2
                                          )
                                        : null}元
                            </ListGroup.Item>
                            <ListGroup.Item
                                title={
                                    <TextWithQuestionMark
                                        info="总操盘资金低于警戒线后，该账号禁止继续买入股票"
                                        text="距离警戒线"
                                    />
                                }
                                align="right"
                            >
                                {money && subAccount
                                    ? round(
                                          money +
                                              subAccount.total -
                                              subAccount.lossWarnMoney,
                                          2
                                      )
                                    : subAccount.total
                                        ? round(
                                              subAccount.total -
                                                  subAccount.lossWarnMoney,
                                              2
                                          )
                                        : null}元
                            </ListGroup.Item>

                            <ListGroup.Item
                                title="追加后子账号总资金"
                                align="right"
                                flexBasis="50%"
                            >
                                {money === undefined
                                    ? subAccount.total
                                    : round(money + subAccount.total, 2)}元
                            </ListGroup.Item>
                            <ListGroup.Item title="账户余额" align="right">
                                {account}元{" "}
                                <ChargeButton to="/member/charge">
                                    充值
                                </ChargeButton>
                            </ListGroup.Item>
                            <ListGroup.Item title="确认支付" align="right">
                                <TextPrimary>{money}元</TextPrimary>
                            </ListGroup.Item>
                        </ListGroup>

                        <Button
                            type="primary"
                            style={{ backgroundColor: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            提交追加保证金申请
                        </Button>
                        <WhiteSpace size="xl" />
                        <RecordTable
                            title="追加保证金"
                            fields={[
                                { label: "追加保证金" },
                                { label: "申请时间" },
                                { label: "申请状态" }
                            ]}
                            onRefresh={this._fetchRecords}
                            loading={recordLoading}
                            lists={records}
                        >
                            {item => (
                                <TableItem
                                    key={item.id}
                                    money={item.money}
                                    status={item.status}
                                    time={`${item.create_time} ${
                                        item.create_time_m
                                    }`}
                                />
                            )}
                        </RecordTable>
                    </WingBlank>

                    <WhiteSpace size="xl" />
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});

export default withRouter(connect(mapStateToProps)(AddMoney));

const TableItem = ({ money, time, status }) => {
    return (
        <tr>
            <td>{money}</td>
            <td>
                <TableTimeFormat time={time} />
            </td>
            <td>
                <TextPrimary>{status}</TextPrimary>
            </td>
        </tr>
    );
};

const InputBar = styled.input`
    border: none;
    width: 98%;
    text-align: center;
    font-size: 16px;
    color: #252525;
    height: 1.1467rem;
    line-height: 1.1467rem;
    @media (max-width: 320px) {
        font-size: 14px;
    }
    ::placeholder {
        color: #8e8e93;
    }
`;
