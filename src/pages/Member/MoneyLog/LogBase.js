import ReactDOM from "react-dom";
import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Icon, ListView } from "antd-mobile";
import NavBar from "components/NavBar";
import TabBarNav from "components/TabBarNav";
import LogItem from "./LogItem";
import Caption from "./Caption";
import axios from "axios";
import { MONEY_LOG } from "api";
const pageTitle = "资金明细";

class LogBase extends PureComponent {
    constructor(props) {
        super(props);
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
            totalPage: 10
        };
    }

    componentDidMount() {
        this._isMount = true;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this._fetchData(++this.pageIndex).then(res => {
            if (!this._isMount) return;

            if (res.data.data && res.data.data.length > 0) {
                this.rData = res.data.data;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    height: hei,
                    refreshing: false,
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        });
    }

    _fetchData(page) {
        const { token } = this.props;
        let keyword = null;
        switch (this.props.type) {
            case "charge":
                keyword = 1;
                break;
            case "withdraw":
                keyword = 3;
                break;
            case "freeze":
                keyword = 33;
                break;
            case "calc":
                keyword = 20;
                break;
            case "promotion":
                keyword = 10;
                break;
            default:
                keyword = null;
        }
        return axios.post(`${MONEY_LOG}?page=${page}`, {
            token,
            keyword,
            _search_field: "type"
        });
    }
    onEndReached = () => {
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        this._fetchData(++this.pageIndex).then(res => {
            if (!this._isMount) return;
            if (res.data.data && res.data.data.length > 0) {
                this.rData = [...this.rData, ...res.data.data];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        });
    };
    componentWillUnmount() {
        this._isMount = false;
    }
    render() {
        const row = rowData => {
            return (
                <LogItem
                    key={rowData.id}
                    time={`${rowData.happend_date} ${rowData.happend_time}`}
                    type={rowData.type_name}
                    money={rowData.affect}
                    account={rowData.account}
                />
            );
        };
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/member/index">
                                <Icon
                                    type="left"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            </Link>
                        }
                    >
                        {pageTitle}
                    </NavBar>
                    <TabBarNav
                        items={[
                            { title: "全部", link: "/member/moneylog/index" },
                            {
                                title: "充值",
                                link: "/member/moneylog/charge"
                            },
                            {
                                title: "提现",
                                link: "/member/moneylog/withdraw"
                            },
                            {
                                title: "冻结",
                                link: "/member/moneylog/freeze"
                            },
                            {
                                title: "结算",
                                link: "/member/moneylog/calc"
                            },
                            {
                                title: "佣金",
                                link: "/member/moneylog/promotion"
                            }
                        ]}
                    />
                    <Caption />

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
export default withRouter(connect(mapStateToProps)(LogBase));
