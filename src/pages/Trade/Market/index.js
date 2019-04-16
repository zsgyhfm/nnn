import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import PageContainer from "components/PageContainer";
import NavBarSearch from "components/NavBarSearch";
import MarketHeader from "../components/MarketHeader";
import StockIndex from "../components/StockIndex";
import axios from "axios";
import * as api from "api";
import round from "lodash/round";
import HotPalateItem from "./HotPalateItem";
import PalateContainer from "./PalateContainer";
import HotPalate from "./HotPalate";
import MarketStockItem from "./components/MarketStockItem";


const Panel = PalateContainer.Panel;
const pageTitle = "行情中心";
class Market extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hotPalate: [],
            raiseList: [],
            stockRaiseList: [],
            stockFallList: [],

        };
    }
    loading = false;

    source = axios.CancelToken.source()
    componentDidMount() {
        this._isMount = true;
        this._fetchRankList(data => {
            let codeData = data.sort(function(item1, item2) {
                if (parseFloat(item1[5]) === parseFloat(item2[5])) {
                    return 0;
                }
                return parseFloat(item1[5]) > parseFloat(item2[5]) ? -1 : 1;
            });
            let stocks = codeData.slice(0, 6);
            this.setState({
                hotPalate: stocks
            });
        });
        this._fetchTopTenList("top");
        this._fetchTopTenList();
    }

    _fetchRankList(fn) {
        axios.get(`${api.MARKET_SECTION}`,{cancelToken:this.source.token}).then(res => {
            if (res.data.status === 1 && this._isMount) {
                this.setState(
                    {
                        raiseList: res.data.data
                    },
                    () => {
                        fn && fn(res.data.data);
                    }
                );
            }
        });
    }

    _fetchTopTenList = type => {
        let queryUrl =
            type === "top" ? api.STOCK_RAISE_TEN : api.STOCK_FALL_TEN;


        axios.get(`${queryUrl}`,{cancelToken:this.source.token}).then(res => {
            if (res.data.status === 1 && this._isMount) {
                if (type === "top") {
                    this.setState({
                        stockRaiseList: res.data.data
                    });
                } else {
                    this.setState({
                        stockFallList: res.data.data
                    });
                }
            }
        });
    };
    componentWillUnmount() {
        this._isMount = false;
        //cancel token
        this.source.cancel("cancel")

    }
    render() {

        const { hotPalate, stockRaiseList, stockFallList } = this.state;

        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <div >
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

                        <PageContainer>
                            <StockIndex />
                            <PalateContainer>
                                <Panel
                                    header="热门行业"
                                    link="/trade/market/bankuai"
                                >
                                    <HotPalate>
                                        {hotPalate.map((item, index) => (
                                            <HotPalateItem
                                                key={index}
                                                title={item[1]}
                                                rate={round(item[5], 2)}
                                                name={item[12]}
                                                price={item[10]}
                                                code={item[0]}
                                                stockRate={round(item[9], 2)}
                                            />
                                        ))}
                                    </HotPalate>
                                </Panel>

                                <Panel header="涨幅榜" link="/trade/market/raise">
                                    <div>
                                        {stockRaiseList.map(item => (
                                            <MarketStockItem
                                                code={item.code}
                                                key={item.code}
                                                rate={item.changepercent}
                                                name={item.name}
                                                price={item.trade}
                                            />
                                        ))}
                                    </div>
                                </Panel>
                                <Panel header="跌幅榜" link="/trade/market/decline">
                                    <div>
                                        {stockFallList.map(item => (
                                            <MarketStockItem
                                                key={item.code}
                                                code={item.code}
                                                rate={item.changepercent}
                                                name={item.name}
                                                price={item.trade}
                                            />
                                        ))}
                                    </div>
                                </Panel>
                            </PalateContainer>
                        </PageContainer>
                    </div>
                    <Footer />
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default Market;
