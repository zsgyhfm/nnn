import React, { Fragment } from "react";
import { Icon, WingBlank, Button, WhiteSpace, Toast } from "antd-mobile";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import ListGroup from "components/List/ListGroup";
import RecordTable from "components/RecordTable/";
import ChargeButton from "./components/ChargeButton";
import OperateBar from "./components/OperateBar";
import RenewalDuration from "./RenewalDuration";
import TableTimeFormat from "components/Table/TableTimeFormat";
import TextPrimary from "components/Text/TextPrimary";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as api from "api";

const pageTitle = "申请延期";

class Renewal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            suffix: props.location.state.info.units,
            activeDuration: null,
            records: [],
            info: props.location.state.info,
            fee: 0,
            account: 0,
            recordLoading: false
        };
    }

    componentDidMount() {
        this._fetchAccountMoney(this.props.token);
        this._fetchRecords();
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

    onChangeDuration = duration => {
        this._getFee(duration);
        this.setState({
            activeDuration: duration
        });
    };

    _getFee = duration => {
        const { token } = this.props;
        const { info } = this.state;
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
            .post(`${api.CALCULATE_RENEWAL_FEE}`, {
                token,
                multiple: info.multiple,
                rate: parseFloat(info.rate),
                type: type,
                deposit_money: info.deposit_money,
                cyctime: duration
            })
            .then(res => {
                if (res.data.status === "1") {
                    this.setState({
                        fee: res.data.data
                    });
                }
            });
    };
    onSubmit = () => {
        if (!this._checkForm()) return;
        axios
            .post(`${api.RENEWAL_APPLY}`, {
                token: this.props.token,
                id: this.state.info.id,
                duration: this.state.activeDuration
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success(res.data.message, 1, () => {
                        window.location.reload();
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };
    _checkForm() {
        const { activeDuration, fee, account } = this.state;
        if (activeDuration === null) {
            Toast.info("请选择续期期限", 1, null, false);
            return false;
        }
        if (fee > account) {
            Toast.info("资金不足，请先充值", 1, null, false);
            return false;
        }
        return true;
    }
    _fetchRecords = () => {
        this.setState({
            recordLoading: true
        });
        const id = this.state.info.id;
        axios
            .post(`${api.PEIZI_DETAIL}?id=${id}`, { token: this.props.token })
            .then(res => {
                this.setState({
                    records: res.data.data.renewal,
                    recordLoading: false
                });
            })
            .catch(res => {
                this.setState({
                    recordLoading: false
                });
            });
    };
    render() {
        const { records, info, fee, account, recordLoading } = this.state;
        let renewalDuration = [];
        switch (info.type) {
            case "按天配资":
                renewalDuration = renewalDay;
                break;
            case "按周配资":
                renewalDuration = renewalWeek;
                break;
            case "按月配资":
                renewalDuration = renewalMonth;
                break;
            default:
                renewalDuration = [];
        }
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
                        <OperateBar title="请选择续期期限">
                            <RenewalDuration
                                suffix={this.state.suffix}
                                items={renewalDuration}
                                activeItem={this.state.activeDuration}
                                onSelectItem={item =>
                                    this.onChangeDuration(item[0])
                                }
                                placeholder="请选择续期时间"
                            />
                        </OperateBar>
                        <ListGroup>
                            <ListGroup.Item title="操盘期限" align="right">
                                {info.verify_time} 至 {info.end_time}
                            </ListGroup.Item>

                            <ListGroup.Item title="续期产生利息" align="right">
                                {fee}元{" "}
                                <span
                                    className="note"
                                    style={{
                                        fontSize: "12px",
                                        display: "inline-block",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    （当前{info.units}利息 x 延期{info.units}数）
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item title="账户余额" align="right">
                                {account}元{" "}
                                <ChargeButton to="/member/charge">
                                    充值
                                </ChargeButton>
                            </ListGroup.Item>
                        </ListGroup>
                        <Button
                            onClick={this.onSubmit}
                            type="primary"
                            style={{ backgroundColor: "#FF4500" }}
                        >
                            提交续期申请
                        </Button>
                        <WhiteSpace size="xl" />
                        <RecordTable
                            title="申请延期记录"
                            onRefresh={this._fetchRecords}
                            fields={[
                                { label: "延期期限" },
                                { label: "延期总利息" },
                                { label: "申请时间" },
                                { label: "申请状态" }
                            ]}
                            lists={records}
                            loading={recordLoading}
                        >
                            {item => (
                                <TableItem
                                    key={item.id}
                                    type={info.type}
                                    duration={item.borrow_duration}
                                    fee={item.borrow_fee}
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
export default withRouter(connect(mapStateToProps)(Renewal));

const TableItem = ({ duration, fee, time,  status }) => {
    return (
        <tr>
            <td>
                {duration}
            </td>
            <td>{fee}</td>
            <td>
                <TableTimeFormat time={time} />
            </td>
            <td>
                <TextPrimary>{status}</TextPrimary>
            </td>
        </tr>
    );
};

const renewalDay = [
    { value: 1, label: "1天" },
    { value: 2, label: "2天" },
    { value: 3, label: "3天" },
    { value: 4, label: "4天" },
    { value: 5, label: "5天" },
    { value: 6, label: "6天" },
    { value: 7, label: "7天" },
    { value: 8, label: "8天" },
    { value: 9, label: "9天" },
    { value: 10, label: "10天" },
    { value: 11, label: "11天" },
    { value: 12, label: "12天" },
    { value: 13, label: "13天" },
    { value: 14, label: "14天" },
    { value: 15, label: "15天" },
    { value: 16, label: "16天" },
    { value: 17, label: "17天" },
    { value: 18, label: "18天" },
    { value: 19, label: "19天" },
    { value: 20, label: "20天" }
];

const renewalWeek = [
    { value: 1, label: "1周" },
    { value: 2, label: "2周" },
    { value: 3, label: "3周" },
    { value: 4, label: "4周" },
    { value: 5, label: "5周" },
    { value: 6, label: "6周" },
    { value: 7, label: "7周" }
];

const renewalMonth = [
    { value: 1, label: "1月" },
    { value: 2, label: "2月" },
    { value: 3, label: "3月" },
    { value: 4, label: "4月" },
    { value: 5, label: "5月" },
    { value: 6, label: "6月" },
    { value: 7, label: "7月" }
];
