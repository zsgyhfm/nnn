import React, {PureComponent, Fragment} from "react";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import {withTheme} from "styled-components";
import {Icon} from "antd-mobile";
import PageContainer from "components/PageContainer";
import OperateGroup from "./OperateGroup";
import List from "components/List/index";
import {Switch, Toast} from "antd-mobile";
import {createForm} from "rc-form";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LinkButton from "components/LinkButton";
import styled from "styled-components";
import TextPrimary from "components/Text/TextPrimary";
import StockColorText from "components/Text/StockColorText";
import TextWithQuestionMark from "components/TextWithQuestionMark";
import axios from "axios";
import * as api from "api";
import {numberFormat} from "../../../util";

const FieldContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

class Detail extends PureComponent {
    constructor(props) {
        super(props);
        this._fetchData(props.match.params.id, props.token);
    }

    componentWillUnmount() {
        this.source.cancel("cancel async")

    }


    state = {
        info: {},
        addfinancing: [],
        addmoney: [],
        renewal: [],
        accountTotalMoney: null//总金额
    };
    source = axios.CancelToken.source()

    //请求数据 会员中心配资列表
    _fetchData(id, token) {
        axios.post(`${api.PEIZI_DETAIL}?id=${id}`, {token}, {cancelToken: this.source.token}).then(res => {
            if (res.data.status === "1") {
                if (res.data.data.result.stock_subaccount_id !== 0)
                    this._fetchSubAccountInfo(
                        res.data.data.result.stock_subaccount_id
                    );
                this.setState({
                    info: res.data.data.result
                });
            } else {
                Toast.fail(res.data.message);
            }
        });
    }

// 子账户资金
    _fetchSubAccountInfo(id) {
        axios
            .post(`${api.SUBACCOUNT_MONEY_INFO}`, {
                id,
                token: this.props.token
            }, {cancelToken: this.source.token})
            .then(res => {
                if (res.data.status === 1) {
                    this.setState({
                        accountTotalMoney: res.data.data.total_money
                    });
                }
            });
    }

    toggleRenewal = () => {
        const id = this.props.match.params.id;
        const token = this.props.token;
        axios.post(`${api.TOGGLE_RENEWAL}`, {id, token});
    };

    onTerminate = () => {
        const id = this.props.match.params.id;
        const token = this.props.token;
        axios.post(`${api.TERMINATE}`, {id, token}).then(res => {
            if (res.data.status === "1") {
                Toast.success("申请成功");
            } else {
                Toast.fail(res.data.message);
            }
        });
    };

    render() {
        const {
            theme,
            form: {getFieldProps}
        } = this.props;
        const {info, accountTotalMoney} = this.state;
        // console.log(info)
        const id = this.props.match.params.id;

        let showBtnExpend = false,
            showBtnAddMoney = false,
            showBtnStop = false,
            showBtnProfit = false,
            showAutoRenewal = false,
            showRenewal = false;

        if (info.status === "操盘中") {
            if (info.type !== "免费体验") {
                showBtnExpend = true;
                showBtnAddMoney = true;
                showRenewal = true;
                showBtnStop = true;
                showBtnProfit = true;
                showAutoRenewal = true;
            }
            if (info.type === "免息配资") {
                showBtnExpend = false;
                showRenewal = false;
            }
        }
        if (info.status === "已逾期") {
            if (info.type !== "免息配资" && info.type !== "免费体验") {
                showRenewal = true;
                showAutoRenewal = false;
            }
        }
        return (
            <DocumentTitle title="操盘详情">
                <Fragment>
                    <OperateGroup
                        onTerminate={this.onTerminate}
                        stopBtnEnabled={showBtnStop}
                        waiting={info.status === "待审核"}
                        notPass={info.status === "未通过"}
                        isEnd={info.status === "已结束"}
                        subAccount={{
                            id: info.stock_subaccount_id,
                            sub_account: info.sub_account
                        }}
                    />
                    <PageContainer>
                        <NavBar
                            left={
                                <Icon
                                    type="left"
                                    style={{width: "30px", height: "30px"}}
                                />
                            }
                            onLeftClick={() => window.history.go(-1)}
                        >
                            我的操盘
                        </NavBar>
                        <List>
                            <List.Item title="申请单号">
                                {info.order_id}
                            </List.Item>
                            <List.Item title="操盘期限">
                                <FieldContainer>
                                    {!info.verify_time ||
                                    (info.status === "待审核" ||
                                        info.status === "未通过")
                                        ? " --  至  -- "
                                        : info.verify_time +
                                        "至" +
                                        info.end_time}
                                </FieldContainer>
                            </List.Item>
                            {showRenewal ? (
                                <List.Item title="自动续期">
                                    <FieldContainer>
                                        <div>
                                            {showAutoRenewal ? (
                                                <Switch
                                                    style={{
                                                        transform: "scale(0.8)"
                                                    }}
                                                    {...getFieldProps(
                                                        `auto-renewal`,
                                                        {
                                                            initialValue:
                                                            info.renewal,
                                                            valuePropName:
                                                                "checked"
                                                        }
                                                    )}
                                                    onClick={this.toggleRenewal}
                                                    color="#FF4500"
                                                />
                                            ) : null}
                                        </div>
                                        <LinkButton
                                            to={{
                                                pathname: `/member/peizi/renewal/${id}`,
                                                state: {
                                                    info: info
                                                }
                                            }}
                                        >
                                            申请延期
                                        </LinkButton>
                                    </FieldContainer>
                                </List.Item>
                            ) : null}

                            <List.Item title="保证金">
                                <FieldContainer>
                                    <span>
                                        {numberFormat(info.deposit_money)}
                                    </span>
                                    {showBtnAddMoney ? (
                                        <LinkButton
                                            to={{
                                                pathname: `/member/peizi/addmoney/${id}`,
                                                state: {
                                                    info: info
                                                }
                                            }}
                                        >
                                            追加保证金
                                        </LinkButton>
                                    ) : null}
                                </FieldContainer>
                            </List.Item>
                            <List.Item title="总操盘资金">
                                <FieldContainer>
                                    <span>{numberFormat(info.init_money)}</span>
                                    {showBtnExpend ? (
                                        <LinkButton
                                            to={{
                                                pathname: `/member/peizi/expend/${id}`,
                                                state: {
                                                    info: info
                                                }
                                            }}
                                        >
                                            扩大配资
                                        </LinkButton>
                                    ) : null}
                                </FieldContainer>
                            </List.Item>
                            <List.Item title="预计盈亏">
                                <FieldContainer>
                                    <StockColorText base={info.return_money}>
                                        {info.return_money
                                            ? info.return_money
                                            : ""}
                                    </StockColorText>
                                    {showBtnProfit ? (
                                        <LinkButton
                                            to={{
                                                pathname: `/member/peizi/profit/${id}`,
                                                state: {
                                                    info: info
                                                }
                                            }}
                                        >
                                            提取盈利
                                        </LinkButton>
                                    ) : null}
                                </FieldContainer>
                            </List.Item>
                            <List.Item title="交易账号">
                                <FieldContainer>
                                    <TextPrimary>
                                        {info.sub_account}
                                    </TextPrimary>
                                    <span>
                                        总资产：
                                        {accountTotalMoney === null
                                            ? "--"
                                            : numberFormat(accountTotalMoney)}元
                                    </span>
                                </FieldContainer>
                            </List.Item>
                            <List.Item title="已提盈金额">
                                <FieldContainer>
                                    <TextPrimary>
                                        {info.stock_sumprofit}
                                    </TextPrimary>
                                </FieldContainer>
                            </List.Item>
                            {info.type === "免费体验" ? null : (
                                <List.Item
                                    title={
                                        <TextWithQuestionMark
                                            text="警戒线"
                                            info="总操盘资金低于警戒线后，该账号禁止继续买入股票"
                                        />
                                    }
                                >
                                    {numberFormat(info.loss_warn_money)}
                                </List.Item>
                            )}
                            {info.type === "免费体验" ? null : (
                                <List.Item
                                    title={
                                        <TextWithQuestionMark
                                            text="平仓线"
                                            info="总操盘资金低于平仓线后，持仓股票会被强制平仓"
                                        />
                                    }
                                >
                                    {numberFormat(info.loss_close_money)}
                                </List.Item>
                            )}
                            <List.Item
                                title={`${
                                    info.units === "月" ? "月" : "总"
                                    }利息`}
                            >
                                {numberFormat(info.borrow_interest)}
                            </List.Item>
                            {info.status === "未通过" ||
                            info.status === "待审核" ? null : (
                                <List.Item title="查看合同" align="right">
                                    <Link
                                        style={{color: theme.blue}}
                                        to={`/peizi/agreement/${info.id}`}
                                    >
                                        《平台操盘协议》
                                    </Link>
                                </List.Item>
                            )}
                        </List>
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    subAccount: state.subAccount,
    accountMoney: state.accountMoney
});

export default withRouter(
    connect(mapStateToProps)(createForm()(withTheme(Detail)))
);
