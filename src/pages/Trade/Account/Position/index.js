import React, { Component, Fragment } from "react";
import NavBar from "components/NavBar";
import { Icon, PullToRefresh } from "antd-mobile";
import AccountTitle from "../components/AccountTitle";
import DocumentTitle from "react-document-title";
import BaseTable from "components/Table/BaseTable";
import PositionItem from "./PositionItem";
import TradeNav from "../components/TradeNav";
import { connect } from "react-redux";
import axios from "axios";
import * as api from "api";
import { Link } from "react-router-dom";

class Position extends Component {
    state = {
        loading: false,
        position: [],
        show: true,
        refreshing: false,
        down: true,
        height: document.documentElement.clientHeight
    };
    componentDidMount() {
        this._isMount = true;
        const subAccount = this.props.subAccount;
        if (subAccount.id) {
            this._fetchPosition();

            this.timer = setInterval(() => {
                this._fetchPosition();
            }, 10000);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.subAccount.id !== prevProps.subAccount.id) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this._fetchPosition();
            }, 10000);
            this._fetchPosition();
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this._isMount = false;
    }
    _fetchPosition = () => {
        const { subAccount, token } = this.props;
        this.setState({
            loading: true
        });
        axios
            .post(`${api.SUBACCOUNT_POSITION}`, { token, id: subAccount.id })
            .then(res => {
                if (!this._isMount) return;
                if (res.data.status === 1) {
                    this.setState({
                        position: res.data.data.list
                    });
                }
                this.setState({
                    loading: false,
                    refreshing: false
                });
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
                            this.setState({ refreshing: true });
                            setTimeout(this._fetchPosition, 1000);
                        }}
                    >
                        <BaseTable
                            fields={fields}
                            loading={this.state.loading}
                            lists={this.state.position}
                        >
                            {item => <PositionItem key={item.id} item={item} />}
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
export default connect(mapStateToProps)(Position);

const fields = [
    { label: "名称/代码", align: "left" },
    { label: "可用/持仓" },
    { label: "现价/成本" },
    { label: "盈亏/市值", align: "right" }
];
