import React, { Component, Fragment } from "react";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import NavBarSearch from "components/NavBarSearch";
import DocumentTitle from "react-document-title";
import PageContainer from "components/PageContainer";
import FooterBar from "./FooterBar";
import StockTitle from "./StockTitle";
import StockSbm from "../components/StockSbm";
import StockPrice from "./StockPrice";
import StockMeta from "./StockMeta";
import Charts from "./Charts";
import * as api from "api";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

const pageTitle = "股票详情";
class Stock extends Component {
    state = {
        code: this.props.match.params.code,
        stock: null,
        minuteData: [],
        dayData: [],
        weekData: [],
        monthData: []
    };
    componentDidMount() {

        this._mounted = true;
        this._fetchData(api.STOCK_MARKET, this.state.code, "stock");
        this._fetchData(api.MINUTE_LINK, this.state.code, "minuteData");
        this._fetchData(api.DAY_LINK, this.state.code, "dayData");
        this._fetchData(api.WEEK_LINK, this.state.code, "weekData");
        this._fetchData(api.MONTH_LINK, this.state.code, "monthData");

        this.timer = setInterval(() => {
            this._fetchData(api.STOCK_MARKET, this.state.code, "stock");
            this._fetchData(api.MINUTE_LINK, this.state.code, "minuteData");
        }, 10000);
    }

    _fetchData = (url, code, field) => {
        axios.get(`${url}?code=${code}`).then(res => {
            if (!this._mounted) return;

            this.setState({
                [field]: res.data.data
            });
        });
    };

    componentWillUnmount() {
        this._mounted = false;
        clearInterval(this.timer)
    }
    render() {
        const { stock, minuteData } = this.state;

        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => window.history.back(-1)}
                        right={
                            <NavBarSearch to="/trade/search">
                                <Icon type="search" />
                            </NavBarSearch>
                        }
                    >
                        <StockTitle
                            name={stock ? stock.name : "--"}
                            code={stock ? stock.code : "--"}
                        />
                    </NavBar>
                    <FooterBar stock={stock} />
                    <PageContainer>
                        <StockPrice stock={stock} />
                        <StockMeta stock={stock} />
                        <Charts
                            activeIndex={0}
                            minuteData={minuteData}
                            yesterdayPrice={stock ? stock.yesterday_price : "0"}
                            dayData={this.state.dayData}
                            weekData={this.state.weekData}
                            monthData={this.state.monthData}
                        />

                        <StockSbm stock={stock} />
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Stock));
