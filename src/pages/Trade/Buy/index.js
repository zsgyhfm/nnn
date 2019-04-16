import React, { Fragment, PureComponent } from "react";
import NavBar from "components/NavBar";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon, WhiteSpace } from "antd-mobile";
import DocumentTitle from "react-document-title";
import AccountTitle from "./../Account/components/AccountTitle";
import TradeNav from "./../Account/components/TradeNav";
import StockTradeBar from "./../Account/components/StockTradeBar";
import StockPriceInfo from "./../Account/components/StockPriceInfo";
import SearchStock from "./../Account/components/SearchStock";
import StockMeta from "./../Account/components/StockMeta";
import Operator from "./Operator";
import StockSbm from "./../components/StockSbm";
import RecordTable from "components/RecordTable/";
import PositionItem from "./PositionItem";
import * as api from "api";
import axios from "axios";
import round from "lodash/round";

const pageTitle = "买入";

class Buy extends PureComponent {
    state = {
        code: this.props.match.params.code,
        stock: null,
        position: [],
        loadingPosition: false
    };

    componentDidMount() {
        this._isMount = true;
        if (this.state.code && this.state.code.length === 6) {
            this._fetchStock(this.state.code);
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this._fetchStock(this.state.code);
            }, 5000);
        }
        if (this.props.subAccount.id) this._fetchPosition();
    }

    componentDidUpdate(prevProps, prevState) {
        // 获取持仓列表

        if (this.props.subAccount.id !== prevProps.subAccount.id) {
            this._fetchPosition();
        }
        if (
            (this.state.stock &&
                this.state.stock.code &&
                prevState.stock &&
                this.state.stock.code !== prevState.stock.code) ||
            (this.state.stock &&
                this.state.stock.code &&
                prevState.stock === null)
        ) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this._fetchStock(this.state.stock.code);
            }, 5000);
        }
    }
    _fetchPosition = () => {
        this.setState({
            loadingPosition: true
        });
        axios
            .post(`${api.SUBACCOUNT_POSITION}`, {
                token: this.props.token,
                id: this.props.subAccount.id
            })
            .then(res => {
                if (!this._isMount) return;
                if (res.data.status === 1) {
                    this.setState({
                        position: res.data.data.list,
                        loadingPosition: false
                    });
                } else {
                    this.setState({
                        loadingPosition: false
                    });
                }
            });
    };
    _fetchStock = code => {
        axios.get(`${api.STOCK_MARKET}?code=${code}`).then(res => {
            if (!this._isMount) return;
            this.setState({
                stock: res.data.data
            });
        });
    };
    changeStock = code => {
        const { history } = this.props;
        history.replace(`/trade/buy/${code}`);
        this._fetchStock(code);
    };
    componentWillUnmount() {
        this._isMount = false;
        clearInterval(this.timer);
    }
    render() {
        const { stock } = this.state;
        return (
            <DocumentTitle title={pageTitle}>
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
                    <StockTradeBar>
                        <StockPriceInfo stock={stock} />
                        <SearchStock />
                    </StockTradeBar>
                    <StockMeta stock={stock} />
                    <StockSbm stock={stock} />
                    <Operator
                        type="buy"
                        currentPrice={stock ? stock.current_price : "--"}
                        yesterdayPrice={stock ? stock.yesterday_price : "--"}
                        code={stock ? stock.code : null}
                        stock={stock}
                        updatePosition={this._fetchPosition}
                    />
                    <WhiteSpace />
                    <RecordTable
                        title="持仓"
                        onRefresh={this._fetchPosition}
                        loading={this.state.loadingPosition}
                        fields={[
                            { label: "名称" },
                            { label: "可用/持仓" },
                            { label: "现价/成本" },
                            { label: "盈亏/市值" }
                        ]}
                        lists={this.state.position}
                    >
                        {item => (
                            <PositionItem
                                key={item.id}
                                name={item.name}
                                code={item.code}
                                available={item.canbuy_count}
                                position={item.stock_count}
                                currentPrice={round(item.now_price, 2)}
                                costPrice={round(item.ck_price, 3).toFixed(3)}
                                profit={round(item.ck_profit, 2)}
                                value={round(item.now_price * item.stock_count)}
                                onClick={this.changeStock}
                            />
                        )}
                    </RecordTable>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    subAccount: state.subAccount
});
export default withRouter(connect(mapStateToProps)(Buy));
