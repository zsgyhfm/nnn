import React, { Component, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import { connect } from "react-redux";
import BaseTable from "components/Table/BaseTable";
import UserItem from "./UserItem";
import axios from "axios";
import * as api from "api";

const pageTitle = "查看用户";

class Invite extends Component {
    state = {
        records: []
    };
    componentDidMount() {
        this._fetchData(this.props.token, this.props.match.params.id);
    }
    _fetchData(token, id) {
        axios
            .post(`${api.SHOW_AGENT_INVITE}`, { token, look_uid: id })
            .then(res => {
                this.setState({
                    records: res.data.data || []
                });
            });
    }
    render() {
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
                        onLeftClick={() => {
                            window.history.back();
                        }}
                    >
                        {pageTitle}
                    </NavBar>
                    <BaseTable
                        fields={[ { label: "邀请用户" },{ label: "注册时间" }]}
                        lists={this.state.records}
                    >
                        {item => (
                            <UserItem
                                key={item.id}
                                time={`${item.create_time} ${
                                    item.create_time_m
                                }`}
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
export default connect(mapStateToProps)(Invite);
