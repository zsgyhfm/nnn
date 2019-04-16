import ReactDOM from "react-dom";
import React, { PureComponent, Fragment } from "react";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { Icon, ListView } from "antd-mobile";
import NavBar from "components/NavBar";
import NavBarSearch from "components/NavBarSearch";
import axios from "axios";
import * as api from "api";
import MarketStockItem from "../components/MarketStockItem";
import StockListHeader from "../components/StockListHeader";
import ListViewContainer from "../components/ListViewContainer";
class RaiseList extends PureComponent {
    constructor(props) {
        super(props);
        this.api =
            props.match.path.indexOf("raise") > 0
                ? api.MARKET_LIST + "?num=30"
                : api.MARKET_LIST + "?num=30&asc=1";
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.pageIndex = 0;
        this.state = {
            dataSource,
            isLoading: true,
            pageTitle:
                props.match.path.indexOf("raise") > 0 ? "涨幅榜" : "跌幅榜",
            height: (document.documentElement.clientHeight * 3) / 4
        };
    }
    componentDidMount() {
        this.rData = [];
        this.height =
            document.documentElement.clientHeight -
            ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        this._fetchData(this.api, ++this.pageIndex);
    }

    _fetchData = (url, page) => {
        axios.get(`${url}&page=${page}`).then(res => {
            if (res.data.status === 1 && res.data.data.length > 0) {
                this.rData = [...this.rData, ...res.data.data];
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
    };
    onEndReached = () => {
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true }, () => {
            this._fetchData(this.api, ++this.pageIndex);
        });
    };

    render() {
        const row = rowData => {
            return (
                <MarketStockItem
                    key={rowData.code}
                    code={rowData.code}
                    name={rowData.name}
                    rate={rowData.changepercent}
                    price={rowData.trade}
                />
            );
        };
        return (
            <DocumentTitle title={this.state.pageTitle}>
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
                                    : "---- 已到底部 ----"}
                            </div>
                        )}
                        renderRow={row}
                        renderBodyComponent={() => <ListViewContainer />}
                        style={{
                            height: this.state.height,
                            overflow: "auto"
                        }}
                        useBodyScroll={false}
                        onEndReached={this.onEndReached}
                        pageSize={30}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(RaiseList);
