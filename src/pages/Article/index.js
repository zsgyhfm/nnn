import ReactDOM from "react-dom";
import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { withRouter } from "react-router-dom";
import { Icon, List, ListView } from "antd-mobile";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as api from "api";
import axios from "axios";

const Item = List.Item;

const ListLink = styled(Link)`
    display: block;
    color: #252525;
`;

class Category extends PureComponent {
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
            pageTitle: this.props.location.state
                ? this.props.location.state.title
                : "帮助中心"
        };
    }

    componentDidMount() {
        this._isMount = true;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

        this._fetchData(this.props.match.params.id, ++this.pageIndex).then(
            res => {
                if (this._isMount) {
                    this.rData = res.data.data;

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(
                            this.rData
                        ),
                        height: hei,
                        refreshing: false,
                        isLoading: false
                    });
                }
            }
        );
    }
    _fetchData = (id, page) => {
        return axios.get(`${api.ARTICLE_LIST}?id=${id}&page=${page}`);
    };

    onEndReached = () => {
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        this._fetchData(this.props.match.params.id, ++this.pageIndex).then(
            res => {
                if (this._isMount) {
                    this.rData = [...this.rData, ...res.data.data];
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(
                            this.rData
                        ),
                        isLoading: false
                    });
                }
            }
        );
    };

    componentWillUnmount() {
        this._isMount = false;
    }
    render() {
        const row = rowData => {
            return (
                <Item key={rowData.id} arrow="horizontal">
                    <ListLink
                        to={`/article/detail/${rowData.id}/${rowData.model}`}
                    >
                        {rowData.title}
                    </ListLink>
                </Item>
            );
        };
        return (
            <DocumentTitle title={this.state.pageTitle}>
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
                        {this.state.pageTitle}
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

export default withRouter(Category);
