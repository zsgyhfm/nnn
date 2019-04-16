import React, {Fragment} from "react";
import {Icon, WingBlank, Button, WhiteSpace, Toast} from "antd-mobile";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import OperateBar from "./components/OperateBar";
import ListGroup from "components/List/ListGroup";
import TextPrimary from "components/Text/TextPrimary";
import RecordTable from "components/RecordTable/";
import ProfitInputBar from "./ProfitInputBar";
import TableTimeFormat from "components/Table/TableTimeFormat";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";
import round from "lodash/round";
import * as api from "api";

const pageTitle = "提取盈利";

class Profit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,
            recordLoading: false,
            records: [],
            info: props.location.state.info,
            maxMoney: 0,
            subAccount: {
                available: 0,
                total: 0,
                available_amount: 0
            }
        };
    }

    source = axios.CancelToken.source()

    componentWillUnmount() {

        this.source.cancel("cancel async")
    }

    componentDidMount() {
        this._fetchRecords();
        this._fetchSubAccountInfo();
    }

    _fetchSubAccountInfo() {
        axios
            .post(`${api.SUBACCOUNT_MONEY_INFO}`, {
                id: this.state.info.stock_subaccount_id,
                token: this.props.token
            }, {cancelToken: this.source.token})
            .then(res => {
                this.setState({
                    subAccount: {
                        available: res.data.data.avail,
                        total: res.data.data.total_money,
                        available_amount: res.data.data.available_amount
                    }
                });
            });
    }

    timer=null;
    _fetchRecords = () => {
        console.log(this.source.token.reason)
       if(!this.source.token.reason){

           this.setState({
               recordLoading: true
           });
       }
        const id = this.state.info.id;
        axios
            .post(`${api.PEIZI_DETAIL}?id=${id}`, {token: this.props.token},{cancelToken: this.source.token})
            .then(res => {

                if(!this.timer){
                    this.timer=setTimeout(() => {
                        this.setState({
                            records: res.data.data.rev_extraction,
                            recordLoading: false
                        });
                    }, 1000);

                }


            })
            .catch(res => {

                if(this.source.token.reason){
                    clearTimeout(this.timer)
                }else {
                    this.setState({
                        recordLoading: false
                    });
                }

            });
    };
    onSubmit = () => {
        const money = this.state.money;
        if (!this._checkForm(money)) return;
        axios
            .post(`${api.DRAW_PROFIT_APPLY}`, {
                token: this.props.token,
                money,
                id: this.props.match.params.id
            }, {cancelToken: this.source.token})
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success(res.data.message, 1, () => {
                        this._fetchRecords();
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };

    validateMoney = e => {
        if (this.state.money > this.state.subAccount.available_amount) {
            this.setState({
                money: this.state.subAccount.available_amount
            });
        }
    };

    onChangeMoney = e => {
        this.setState({
            money: e.target.value
        });
    };

    _checkForm(money) {
        if (!money) {
            return Toast.info("请输入提取盈利金额", 1, null, false);
        }
        if (money > this.state.subAccount.available_amount) {
            return Toast.info("申请金额超过最大可提现金额", 1, null, false);
        }
        if (money < 100) {
            return Toast.info("提取盈利金额最少为100元", 1, null, false);
        }
        return true;
    }

    getAll = money => {
        this.setState({
            money
        });
    };

    render() {
        const {recordLoading, records, info, subAccount, money} = this.state;
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Icon
                                type="left"
                                style={{width: "30px", height: "30px"}}
                            />
                        }
                        onLeftClick={() => window.history.go(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <WingBlank>
                        <OperateBar title="请输入提取盈利金额">
                            <ProfitInputBar
                                placeholder={`可提取盈利${subAccount.available_amount ||
                                0}元`}
                                maxMoney={subAccount.available_amount}
                                value={this.state.money}
                                validateMoney={this.validateMoney}
                                onChangeMoney={this.onChangeMoney}
                                getAll={money => this.getAll(money)}
                            />
                        </OperateBar>
                        <ListGroup>
                            <ListGroup.Item title="可用余额" align="right">
                                <TextPrimary>
                                    {subAccount.available}元
                                </TextPrimary>
                            </ListGroup.Item>
                            <ListGroup.Item title="账号总资产" align="right">
                                {subAccount.total}元
                            </ListGroup.Item>
                            <ListGroup.Item title="总操盘资金" align="right">
                                {info.init_money}元
                            </ListGroup.Item>
                            <ListGroup.Item flexBasis="100%">
                                <div
                                    style={{
                                        padding: "10px 20px",
                                        color: "#252525",
                                        fontSize: "13px"
                                    }}
                                >
                                    说明： <br/>
                                    1. 在配资到期时间之前，允许提取股票盈利。
                                    <br/>
                                    2. 提取股票盈利需满足盈利金额大于100元。
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                title="提盈后可用余额"
                                align="right"
                                flexBasis="50%"
                            >
                                <TextPrimary>
                                    {money
                                        ? round(subAccount.available - money, 2)
                                        : subAccount.available}元
                                </TextPrimary>
                            </ListGroup.Item>
                            <ListGroup.Item title="确认提盈" align="right">
                                <TextPrimary>{money}元</TextPrimary>
                            </ListGroup.Item>
                        </ListGroup>

                        <Button
                            type="primary"
                            style={{backgroundColor: "#FF4500"}}
                            onClick={this.onSubmit}
                        >
                            提交提取盈利申请
                        </Button>
                        <WhiteSpace size="xl"/>
                        <RecordTable
                            title="提取盈利记录"
                            fields={[
                                {label: "提取盈利"},
                                {label: "申请时间"},
                                {label: "申请状态"}
                            ]}
                            loading={recordLoading}
                            lists={records}
                            onRefresh={this._fetchRecords}
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

                    <WhiteSpace size="xl"/>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Profit));

const TableItem = ({money, rate, time, status}) => {
    return (
        <tr>
            <td>{money}</td>
            <td>
                <TableTimeFormat time={time}/>
            </td>
            <td>
                <TextPrimary>{status}</TextPrimary>
            </td>
        </tr>
    );
};
