import React, { Component, Fragment } from "react";
import NavBar from "components/NavBar";
import { Icon, PullToRefresh, Toast } from "antd-mobile";
import AccountTitle from "../components/AccountTitle";
import DocumentTitle from "react-document-title";
import BaseTable from "components/Table/BaseTable";
import CancelItem from "./CancelItem";
import TradeNav from "../components/TradeNav";
import { connect } from "react-redux";
import axios from "axios";
import * as api from "api";
import { Link } from "react-router-dom";
import qs from "qs";
class Cancel extends Component {
    state = {
        loading: false,
        trust: [],
        show: true,
        refreshing: false,
        down: true,
        height: document.documentElement.clientHeight
    };
    componentDidMount() {
        this._isMount = true;
        const subAccount = this.props.subAccount;
        if (subAccount.id) {
            this._fetchTrustList();
/* 
            this.timer = setInterval(() => {
                this._fetchTrustList();
            }, 10000); */
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.subAccount.id !== prevProps.subAccount.id) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this._fetchTrustList();
            }, 10000);
            this._fetchTrustList();
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this._isMount = false;
    }
    _fetchTrustList = () => {
        const { subAccount, token } = this.props;
        this.setState({
            loading: true
        });
        axios
            .post(`${api.CANCEL_LIST}`, { token, id: subAccount.id })
            .then(res => {
                if (!this._isMount) return;
                if (res.data.status === 1) {
                    this.setState({
                        trust: res.data.data.list
                    });
                }
                this.setState({
                    loading: false,
                    refreshing: false
                });
            });
    };
    onCancelTrust = item => {
        const { subAccount, token } = this.props;
        axios
            .post(
                `${api.CANCEL_ORDER}`,
                qs.stringify({
                    token,
                    id: subAccount.id,
                    trust_no: item.trust_no
                })
            )
            .then(res => {
                if (res.data.status === 1) {
                    this._fetchTrustList();
                    Toast.info(res.data.message, 1, null, false);
                } else {
                    Toast.info(res.data.message, 1, null, false);
                }
            });
    };
    render() {
        return (
            <DocumentTitle title="持仓查询">
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/trade/account/index">
                                <Icon type="left" />
                            </Link>
                        }
                    >
                        <AccountTitle />
                    </NavBar>
                    <TradeNav />
                    <PullToRefresh
                        ref={el => (this.ptr = el)}
                        indicator={
                            this.state.down
                                ? {}
                                : { deactivate: "上拉可以刷新" }
                        }
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }, () => {
                                this._fetchTrustList();
                            });
                        }}
                    >
                        <BaseTable
                            fields={fields}
                            loading={this.state.loading}
                            lists={this.state.trust}
                        >
                            {item => (
                                <CancelItem
                                    key={item.id}
                                    item={item}
                                    onCancelTrust={this.onCancelTrust}
                                />
                            )}
                        </BaseTable>
                    </PullToRefresh>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    subAccount: state.subAccount,
    token: state.token
});
export default connect(mapStateToProps)(Cancel);

const fields = [
    { label: "名称/代码", align: "left" },
    { label: "委托价/委托量" },
    { label: "状态/时间" },
    { label: "方向/操作", align: "right" }
];
