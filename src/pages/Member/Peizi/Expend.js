import React, { PureComponent, Fragment } from "react";
import { Icon, WingBlank, Button, WhiteSpace, Toast } from "antd-mobile";
import NavBar from "components/NavBar";
import * as api from "api";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import OperateBar from "./components/OperateBar";
import styled from "styled-components";
import ListGroup from "components/List/ListGroup";
import TextPrimary from "components/Text/TextPrimary";
import RecordTable from "components/RecordTable/";
import ChargeButton from "./components/ChargeButton";
import TableTimeFormat from "components/Table/TableTimeFormat";
import debounce from "lodash/debounce";
import round from "lodash/round";

const pageTitle = "扩大配资";

class Expend extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            recordLoading: false,
            money: 0,
            account: 0,
            records: [],
            info: props.location.state.info,
            fee: 0
        };
    }
    componentDidMount() {
        this._fetchRecords();
        this._fetchAccountMoney(this.props.token);
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
                        records: res.data.data.addfinancing
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

    onMoneyChange = e => {
        e.target.value = e.target.value.replace(/[^\d]/g, "");

        this.setState(
            {
                money: parseInt(e.target.value || 0, 10)
            },
            () => {
                this._getFee();
            }
        );
    };
    _getFee = debounce(duration => {
        const { token } = this.props;
        const { info, money } = this.state;
        let type = 0;
        switch (info.type) {
            case "按天配资":
                type = 1;
                break;
            case "按周配资":
                type = 2;
                break;
            case "按月配资":
                type = 3;
                break;
            case "免费体验":
                type = 4;
                break;
            case "免息配资":
                type = 5;
                break;
            default:
        }

        axios
            .post(`${api.CALCULATE_EXPEND_FEE}`, {
                token,
                multiple: info.multiple,
                rate: info.rate,
                type: type,
                deposit_money: money,
                endTime: info.end_time_st
            })
            .then(res => {
                if (res.data.status === "1") {
                    this.setState({
                        fee: res.data.data
                    });
                }
            });
    }, 300);

    onSubmit = () => {
        const { money } = this.state;
        const { token, match } = this.props;
        const { id } = match.params;
        if (!this._checkForm(money)) return;
        axios
            .post(`${api.EXPEND_APPLY}`, { token, id, deposit_money: money })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success(res.data.message, 1, () => {
                        this._fetchRecords();
                        this._fetchAccountMoney(token);
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            })
            .catch(err => {
                Toast.fail(err);
            });
    };
    _checkForm(money) {
        if (!money) {
            Toast.info("请输入扩大保证金金额", 1, null, false);
            return false;
        }
        if (money < 100) {
            Toast.info("扩大保证金金额不能少于100元", 1, null, false);
            return false;
        }
        if (money % 100 !== 0) {
            Toast.info("扩大保证金金额必须是100的整数倍", 1, null, false);
            return false;
        }
        return true;
    }
    render() {
        const { account, recordLoading, fee, info, money } = this.state;
        const expendedMoney = parseInt(money, 10) * info.multiple;
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
                        <OperateBar title="请输入扩大保证金金额">
                            <InputBar
                                type="text"
                                onChange={this.onMoneyChange}
                            />
                        </OperateBar>
                        <ListGroup>
                            <ListGroup.Item title="操盘期限" align="right">
                                {info.verify_time} 至 {info.end_time}
                            </ListGroup.Item>
                            <ListGroup.Item title="扩大配资金额" align="right">
                                <span
                                    style={{
                                        display: "inline-block",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {expendedMoney}元
                                </span>
                                <span
                                    className="note"
                                    style={{
                                        fontSize: "12px",
                                        display: "inline-block",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    (扩大保证金 x{" "}
                                    <TextPrimary>{info.multiple}倍</TextPrimary>杠杆率)
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item title="操盘资金" align="right">
                                {info.init_money}元
                            </ListGroup.Item>
                            <ListGroup.Item
                                title="扩大后总操盘资金"
                                align="right"
                                flexBasis="55%"
                            >
                                {info.init_money + expendedMoney + money}元
                            </ListGroup.Item>
                            <ListGroup.Item
                                title="产生利息"
                                align="right"
                            >
                                {fee || 0}元
                            </ListGroup.Item>
                            <ListGroup.Item title="账户余额" align="right">
                                {account}元{" "}
                                <ChargeButton to="/member/charge">
                                    充值
                                </ChargeButton>
                            </ListGroup.Item>
                            <ListGroup.Item title="确认支付" align="right">
                                <span>{ round(money + fee, 2) || 0}</span> 元
                            </ListGroup.Item>
                        </ListGroup>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            提交扩大配资申请
                        </Button>

                        <WhiteSpace size="xl" />

                        <RecordTable
                            title="扩大配资记录"
                            fields={[
                                { label: "扩大保证金" },
                                { label: "产生利息" },
                                { label: "申请时间" },
                                { label: "申请状态" }
                            ]}
                            lists={this.state.records}
                            loading={recordLoading}
                            onRefresh={this._fetchRecords}
                        >
                            {item => (
                                <TableItem
                                    key={item.id}
                                    money={item.money}
                                    rate={item.borrow_interest}
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
export default withRouter(connect(mapStateToProps)(Expend));

const TableItem = ({ money, rate, time, status }) => {
    return (
        <tr>
            <td>{money}</td>
            <td>{rate}</td>
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
    height: 100%;
    width: 100%;
    border: none;
    text-align: center;
    font-size: 18px;
`;
