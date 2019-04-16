import ReactDOM from "react-dom";
import React, { PureComponent, Fragment } from "react";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { Icon, ListView } from "antd-mobile";
import NavBar from "components/NavBar";
import NavBarSearch from "components/NavBarSearch";
import axios from "axios";
import * as api from "api";
import round from "lodash/round";
import MarketStockItem from "../components/MarketStockItem";
import ListViewContainer from "../components/ListViewContainer";
import StockListHeader from "./../components/StockListHeader";
class BankuaiDetail extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.pageIndex = 0;
        this.rData = [];

        this.api =
            api.MARKET_SECTION_STOCKS +
            `?industry_code=${props.match.params.code}`;

        this.state = {
            dataSource,
            isLoading: true,
            pageTitle: this.props.location.state.pageTitle,
            isEnd: false
        };
    }
    componentDidMount() {
    
        this.listViewHeight = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop
        this._fetchData(this.api, ++this.pageIndex);
    }

    _fetchData = (url, page) => {
        this.setState({
            isLoading: true
        });
        axios.get(`${url}&page=${page}`).then(res => {
            if (res.data.status === 1 && res.data.data.length > 0) {
                if (+res.data.page === res.data.total_page)
                    this.setState({ isEnd: true });
                let stockCodes = "";
                let stocks = res.data.data;
                stocks.forEach(item => {
                    stockCodes += item.code + ",";
                });
                stockCodes = stockCodes.substr(0, stockCodes.length - 1);

                axios
                    .get(`${api.QUERY_STOCKS}?code=${stockCodes}`)
                    .then(res2 => {
                        if (
                            res2.data.status === 1 &&
                            res2.data.data.length > 0
                        ) {
                            let stocksWithPrice = res2.data.data;

                            let sourceData = stocks.map((item, index) => {
                                return {
                                    ...item,
                                    price: stocksWithPrice[index].current_price,
                                    rate:
                                        stocksWithPrice[index]
                                            .yesterday_price === "0.00"
                                            ? "0"
                                            : round(
                                                  ((stocksWithPrice[index]
                                                      .current_price -
                                                      stocksWithPrice[index]
                                                          .yesterday_price) /
                                                      stocksWithPrice[index]
                                                          .yesterday_price) *
                                                      100,
                                                  2
                                              )
                                };
                            });
                            this.rData = [...this.rData, ...sourceData];
                            if (page === 1) {
                                this.setState({
                                    dataSource: this.state.dataSource.cloneWithRows(
                                        this.rData
                                    ),
                                    isLoading: false,
                                    height: this.height
                                });
                            } else {
                                this.setState({
                                    dataSource: this.state.dataSource.cloneWithRows(
                                        this.rData
                                    ),
                                    isLoading: false
                                });
                            }
                        }
                    });
            }
        });
    };
    onEndReached = () => {
        if (this.state.isLoading || this.state.isEnd) {
            return;
        }
        this.setState({ isLoading: true }, () => {
            this._fetchData(this.api, ++this.pageIndex);
        });
    };
    render() {
        const history = this.props.history;
        const row = item => {
            return (
                <MarketStockItem
                    key={item.code}
                    code={item.code}
                    rate={item.rate}
                    name={item.name}
                    price={item.price}
                />
            );
        };
        return (
            <DocumentTitle title={this.state.pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => history.go(-1)}
                        right={
                            <NavBarSearch to="/trade/search">
                                <Icon type="search" />
                            </NavBarSearch>
                        }
                    >
                        {this.state.pageTitle}
                    </NavBar>
                    <StockListHeader
                        fields={[
                            { label: "名称", align: "left" },
                            { label: "价格" },
                            { label: "涨跌", align: "right" }
                        ]}
                    />
                    <ListView
                        ref={el => (this.lv = el)}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (
                            <div style={{ textAlign: "center" }}>
                                {this.state.isLoading
                                    ? "加载中..."
                                    : "----已到底----"}
                            </div>
                        )}
                        style={{
                            height: this.listViewHeight,
                            overflow: "auto"
                        }}
                        renderRow={row}
                        useBodyScroll={false}
                        onEndReached={this.onEndReached}
                        renderBodyComponent={() => <ListViewContainer />}
                        pageSize={20}
                        initialListSize={20}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(BankuaiDetail);
