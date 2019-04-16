import React, { PureComponent, Fragment } from "react";
import ReactDOM from "react-dom";
import { Icon, ListView } from "antd-mobile";
import DocumentTitle from "react-document-title";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "components/NavBar";
import axios from "axios";
import MessageItem from "./MessageItem";
import * as api from "api";

const pageTitle = "消息管理";

let pageIndex = 0;

class Notice extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            totalPage: 1
        };
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this._fetchMessage(++pageIndex).then(res => {
            this.rData = res.data.data.data;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                totalPage: res.data.data.last_page
            });
        });
    }
    _fetchMessage(page) {
        const { token } = this.props;
        return axios.post(`${api.MESSAGE}?page=${page}`, { token });
    }
    onEndReached = () => {
        if (this.state.isLoading || pageIndex === this.state.totalPage) {
            return;
        }
        this.setState({ isLoading: true });
        this._fetchMessage(++pageIndex).then(res => {
            this.rData = [...this.rData, ...res.data.data.data];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false
            });
        });
    };
    markReaded = id => {
        const { token } = this.props;
        axios.post(`${api.MESSAGE_MARK}`, { token, id }).then(res => {
            if (res.data.status === "1") {
                this.rData = this.rData.map(item => {
                    if (item.id === id) {
                        item.status = 1;
                    }
                    return item;
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData)
                });
            }
        });
    };
    componentWillUnmount(){
        pageIndex = 0;
    }
    render() {
        const row = (rowData) => {
            return (
                <MessageItem
                    key={rowData.id}
                    id={rowData.id}
                    title={rowData.title}
                    unread={rowData.status}
                    brief={rowData.info}
                    date={rowData.create_time}
                    onClick={this.markReaded}
                    rowDataLists={this.rData}
                />
            );
        };
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Icon
                                type="left"
                                style={{ width: "30px", height: "30px" }}
                            />
                        }
                        onLeftClick={() => window.history.go(-1)}
                    >
                        {pageTitle}
                    </NavBar>
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
                        pageSize={10}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Notice));
