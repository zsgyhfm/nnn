import ReactDOM from "react-dom";
import React, { PureComponent, Fragment } from "react";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { Icon, ListView } from "antd-mobile";
import NavBar from "components/NavBar";
import NavBarSearch from "components/NavBarSearch";
import StockItem from "./StockItem";
import MarketHeader from "../../components/MarketHeader";
import axios from "axios";
import * as api from "api";
import orderBy from "lodash/orderBy";
import BaseTable from "components/Table/BaseTable";
import imgUp from "images/shangz@2x.png";
import imgDown from "images/xiad@2x.png";
import round from "lodash/round";
class MarketList extends PureComponent {
    constructor(props) {
        super(props);
        this.api = api.A_SHARE_STOCKS + "?";
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.pageIndex = 0;
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            totalPage: 1,
            lists: []
        };
    }
    loading = false;
    componentDidMount() {
        this.hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.rData = [];
        this._fetchData(this.api, ++this.pageIndex);
    }

    _fetchData = (url, page) => {
        axios.get(`${url}&page=${page}`).then(res => {
            if (res.data.status === 1 && res.data.data.list.length > 0) {
                const newData = res.data.data.list.map(item => ({
                    ...item,
                    range: round(item.current_price - item.yesterday_price, 2),
                    rate: round(
                        ((item.current_price - item.yesterday_price) /
                            item.yesterday_price) *
                            100,
                        2
                    )
                }));

                this.rData = [...this.rData, ...newData];

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                    height: this.hei,
                    totalPage: Math.ceil(
                        res.data.data.total / res.data.data.pnum
                    )
                });
            }
        });
    };
    onEndReached = () => {
        if (this.state.isLoading || this.pageIndex === this.state.totalPage) {
            return;
        }
        this.setState({ isLoading: true }, () => {
            this._fetchData(api.A_SHARE_STOCKS, ++this.pageIndex);
        });
    };
    orderByRange = sort => {
        this.rangeRule = this.rangeRule === "desc" ? "asc" : "desc";
        const sortedOrder = orderBy(this.rData, sort, this.rangeRule);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(sortedOrder),
            isLoading: false
        });
    };
    render() {
        const row = rowData => {
            return <StockItem key={rowData.code} item={rowData} />;
        };
        return (
            <DocumentTitle title="行情中心">
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
                        <MarketHeader />
                    </NavBar>
                    <BaseTable
                        fields={[
                            { label: "名称", align: "left", width: "32%" },
                            { label: "最新", width: "22.6666%" },
                            {
                                label: (
                                    <Fragment>
                                        涨幅{" "}
                                        <img
                                            src={imgUp}
                                            width="10"
                                            height="10"
                                            alt="up"
                                        />
                                    </Fragment>
                                ),
                                width: "22.6666%",
                                onClick: () => this.orderByRange("rate")
                            },
                            {
                                label: (
                                    <Fragment>
                                        涨跌{" "}
                                        <img
                                            src={imgDown}
                                            width="10"
                                            height="10"
                                            alt="up"
                                        />
                                    </Fragment>
                                ),
                                width: "22.6666%",
                                onClick: () => this.orderByRange("range")
                            }
                        ]}
                        lists={[1]}
                    >
                        {item => {
                            return null;
                        }}
                    </BaseTable>
                    <ListView
                        ref={el => (this.lv = el)}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (
                            <div style={{ textAlign: "center" }}>
                                {this.state.isLoading
                                    ? "加载中..."
                                    : "---- 已到底部 ----"}
                            </div>
                        )}
                        renderRow={row}
                        useBodyScroll={true}
                        onEndReached={this.onEndReached}
                        pageSize={30}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(MarketList);
