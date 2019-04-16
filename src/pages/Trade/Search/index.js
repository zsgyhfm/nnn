import React, {Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { SearchBar, NavBar, Icon } from "antd-mobile";
import SearchHistory from "./SearchHistory";
import SearchList from "./SearchList";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { QUERY_STOCK } from "api";
import axios from "axios";
import * as api from "api";
import {
    fetchSelections,
    addSelection as addSelectionAction,
    deleteSelection as deleteSelectionAction
} from "actions/selection";
import HotSearchList from './HotSearchList';
class Search extends PureComponent {
    state = {
        showHistory: true,
        showResult: false,
        emptyResult: false,
        searchResult: [],
        historyStock: [],
        hotSearchList: []
    };

    componentDidMount() {
        const { fetchSelections, memberId: uid, token } = this.props;
        if (uid && token) fetchSelections(uid, token);

        let searchHistory = JSON.parse(localStorage.getItem("history")) || [];
        this.setState({
            historyStock: searchHistory
        });
        this.fetchHotSearchList()
    }

    fetchHotSearchList = () => {
        axios.get(`${api.HOT_SEARCH}`).then(res => {
            if(res.data.status === 1){
                this.setState({
                    hotSearchList: res.data.data
                })
            }
        })
    }

    fetchStock = code => {
        if (code === "") return;
        this.setState({
            emptyResult: false
        });
        
        axios.get(`${QUERY_STOCK}?key=${code}`).then(res => {
            if (res.data.status === 1) {
                this.setState({
                    searchResult: res.data.data,
                    emptyResult: false
                });
            } else {
                this.setState({
                    emptyResult: true
                });
            }
        });
    };

    checkStock = (item, history) => {
        this.addToSearchHistory(item);
        // 根据浏览记录跳转到指定页面
        const { location } = this.props;
        let pathname =
            location.state && location.state.from
                ? `${location.state.from}${item.code}`
                : `/trade/stock/${item.code}`;

        history.push({
            pathname,
        });
    };

    addToSearchHistory = item => {
        const { historyStock } = this.state;

        const newHistory = historyStock.filter(stock => {
            return stock.code !== item.code;
        });
        if (newHistory.length > 3) {
            newHistory.pop();
        }
        newHistory.unshift(item);
        localStorage.setItem("history", JSON.stringify(newHistory));

        axios.post(`${api.ADD_TO_HISTORY}`, {
            code: item.code,
            code_title: item.name,
            token: this.props.token
        });
    };
    toggleSelect = (stock, inSelection) => {
        const {
            memberId,
            token,
            addToSelection,
            deleteFromSelection
        } = this.props;
        inSelection
            ? deleteFromSelection(token, stock.code)
            : addToSelection(token, stock.name, stock.code, memberId);
    };

    clearHistory = () => {
        localStorage.removeItem("history");
        this.setState({
            historyStock: []
        });
    };

    render() {
        const { history } = this.props;
        const { historyStock, emptyResult,hotSearchList } = this.state;
        const debounceQueryStock = debounce(this.fetchStock, 300);

        return (
            <div className="search-page">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >
                    股票查询
                </NavBar>
                <SearchBar
                    placeholder="请输入股票代码 / 名称 / 简称"
                    maxLength="6"
                    onFocus={() => {
                        this.setState({ showHistory: false, showResult: true });
                    }}
                    onChange={debounceQueryStock}
                    onCancel={() => {
                        history.goBack()
                    }}
                />
                {this.state.showHistory ? (
                    <Fragment>
                    <SearchHistory
                        historyStock={historyStock}
                        toggleSelect={this.toggleSelect}
                        onCheckStock={stock => this.checkStock(stock, history)}
                        clearHistory={this.clearHistory}
                    />
                    <HotSearchList
                        lists={hotSearchList}
                        >

                    </HotSearchList>
                    </Fragment>
                ) : null}
                <SearchList
                    onCheckStock={stock => this.checkStock(stock, history)}
                    stocks={this.state.searchResult}
                    emptyResult={emptyResult}
                    toggleSelect={this.toggleSelect}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    memberId: state.memberId,
    selection: state.selection
});

const mapDispatchToProps = dispatch => ({
    fetchSelections: (uid, token) => {
        dispatch(fetchSelections(uid, token));
    },
    addToSelection: (token, name, code, uid) => {
        dispatch(addSelectionAction(token, name, code, uid));
    },
    deleteFromSelection: (token, code) => {
        dispatch(deleteSelectionAction(token, code));
    }
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Search)
);
