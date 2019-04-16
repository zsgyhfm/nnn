import ReactDOM from "react-dom";
import React, { Component } from "react";
import { WhiteSpace, ListView } from "antd-mobile";
import { connect } from "react-redux";
import axios from "axios";
import * as api from "api";
import PromotionTabNav from "../components/PromotionTabNav";
import { ScrollBodyContainer } from "./Style";
import UserItem from "./UserItem";

class Users extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.pageIndex = 0;
        this.rData = [];
        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true
        };
    }

    componentDidMount() {
        this._isMount = true;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this._fetchData(this.props.token, ++this.pageIndex, hei);
    }
    componentWillUnmount() {
        this._isMount = false;
    }
    _fetchData(token, page, hei) {
        this.setState({
            loading: true
        });
        axios
            .post(`${api.INVITE_USER_RECORD}?page=${page}`, { token, order: 0 })
            .then(res => {
                if (
                    this._isMount &&
                    res.data.data &&
                    res.data.data.length > 0
                ) {
                    this.rData = [...this.rData, ...res.data.data];
                    if (page === 1) {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(
                                this.rData
                            ),
                            height: hei,
                            hasMore: res.data.data.length === 10,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(
                                this.rData
                            ),
                            hasMore: res.data.data.length === 10,
                            isLoading: false
                        });
                    }
                }
            });
    }
    onEndReached = () => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this._fetchAwardList(++this.pageIndex);
    };
    render() {
        const row = item => <UserItem key={item.id} item={item} />;
        return (
            <ScrollBodyContainer>
                <PromotionTabNav />
                <WhiteSpace />
                <ListView
                    ref={el => (this.lv = el)}
                    dataSource={this.state.dataSource}
                    style={{
                        height: this.state.height,
                        overflow: "auto"
                    }}
                    scrollRenderAheadDistance={200}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                    renderRow={row}
                    renderFooter={() => (
                        <div style={{ textAlign: "center" }}>
                            {this.state.isLoading
                                ? "加载中..."
                                : "---- 已到底部 ----"}
                        </div>
                    )}
                />;
            </ScrollBodyContainer>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default connect(mapStateToProps)(Users);
