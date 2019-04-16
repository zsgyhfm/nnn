import React, { Component, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import BaseTable from "components/Table/BaseTable";
import UserItem from "./UserItem";
import axios from "axios";
import * as api from "api";
import PromotionTabNav from "../components/PromotionTabNav";

const pageTitle = "推广明细";

class Users extends Component {
    state = {
        records: [],
        isAgent: false
    };
    componentDidMount() {
        this._fetchData(this.props.token);
    }

    _fetchData(token) {
        axios
            .post(`${api.INVITE_USER_RECORD}`, { token, order: 0 })
            .then(res => {
                this.setState({
                    records: res.data.data || []
                });
            });
        axios.post(`${api.AGENT_PAGE}`, { token }).then(res => {
            const { agent_id } = res.data.data;
            this.setState({
                isAgent: agent_id === 3
            });
        });
    }
    render() {
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
                    <PromotionTabNav />
                    <BaseTable
                        fields={[
                            { label: "邀请用户" },
                            { label: "注册时间" },
                            { label: "返佣截至" }
                        ]}
                        lists={this.state.records}
                    >
                        {item => (
                            <UserItem
                                key={item.id}
                                time={`${item.create_time} ${
                                    item.create_time_m
                                }`}
                                endTime={
                                    this.state.isAgent
                                        ? "长期有效"
                                        : item.back_end
                                }
                                username={item.mobile}
                            />
                        )}
                    </BaseTable>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Users));
