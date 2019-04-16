import ReactDOM from "react-dom";
import React, {PureComponent, Fragment} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import {Icon, ListView} from "antd-mobile";
import TabNav from "./TabNav";
import axios from "axios";
import * as api from "api";
import ListItem from "./ListItem";
import {createForm} from "rc-form";

const pageTitle = "我的操盘";

class PeiziBase extends PureComponent {
    //这个props是router传递过来的
    constructor(props) {
        // console.log("peizibase",props)

        super(props);
        // console.log("peizibase",this.props)
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
        };
    }
//组建渲染完成
    componentDidMount() {
        this._isMount = true;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        const {token} = this.props;
        this._fetchData(token, ++this.pageIndex).then(res => {
            if (this._isMount) {
                this.rData = res.data.data.data;

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    height: hei,
                    refreshing: false,
                    isLoading: false,
                    totalPage: res.data.data.last_page
                });
            }
        });
    }
// 我的操盘--状态
    _fetchData = (token, page) => {
        let status = null;
        switch (this.props.type) {
            case "index":
                status = null;
                break;
            case "using":
                status = 4;
                break;
            case "waiting":
                status = 2;
                break;
            case "failed":
                status = 3;
                break;
            case "finished":
                status = 5;
                break;
            default:
                status = null;
        }
        //根据状态码 来请求 操盘信息
        return axios.post(
            `${api.PEIZI_LIST}?status=${status}&type_list=search&page=${page}`,
            {token}
        );
    };

    onEndReached = () => {
        if (this.state.isLoading || this.pageIndex === this.state.totalPage) {
            return;
        }
        this.setState({isLoading: true});
        this._fetchData(this.props.token, ++this.pageIndex).then(res => {
            if (this._isMount) {
                this.rData = [...this.rData, ...res.data.data.data];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false
                });
            }
        });
    };
    onToggleRenewal = id => {
        axios.post(`${api.TOGGLE_RENEWAL}`, {token: this.props.token, id});
    };

    componentWillUnmount() {
        this._isMount = false;
    }

    render() {
        const {getFieldProps} = this.props.form;

        //行数据
        const row = rowData => {
            return (
                <ListItem
                    getFieldProps={getFieldProps}
                    key={rowData.id}
                    onToggleRenewal={this.onToggleRenewal}
                    item={rowData}
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
                                    style={{width: "30px", height: "30px"}}
                                />
                            </Link>
                        }
                    >
                        {pageTitle}
                    </NavBar>
                    <TabNav/>
                    <ListView className="zaks1"
                        ref={el => (this.lv = el)}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (
                            <div style={{textAlign: "center"}}>
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
export default withRouter(connect(mapStateToProps)(createForm()(PeiziBase)));

