import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon, List } from "antd-mobile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "components/NavBar";
import gear from "images/gear.png";
import loudSpeaker from "images/loudspeaker.png";
import * as api from "api";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
const pageTitle = "站内信";

const Brief = List.Item.Brief;
const Item = styled(List.Item)`
    .am-list-extra {
        flex-basis: 55% !important;
    }
`;
class Message extends PureComponent {
    state = {
        gonggao: {},
        message: {}
    };
    componentDidMount() {
        const token = this.props.token
        axios
            .post(`${api.MESSAGE_INDEX}`, { token })
            .then(res => {
                if (res.data.status === "1" && res.data.data) {
                    this.setState({
                        gonggao: res.data.data.ggao,
                        message: res.data.data.messgae || {}
                    });
                }
            });
        this.readAllMessage(token);
    }

    readAllMessage = token => {
        axios.post(api.MESSAGE_READ_ALL, { token });
    };
    render() {
        const { gonggao, message } = this.state;
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
                    <List>
                        <Item
                            onClick={() => {
                                this.props.history.push({
                                    pathname: "/news/2",
                                    state: {
                                        title: "公告信息"
                                    }
                                });
                            }}
                            align="top"
                            extra={gonggao.create_time}
                            thumb={
                                <img
                                    src={loudSpeaker}
                                    alt="icon"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            }
                            multipleLine
                        >
                            公告信息 <Brief>{gonggao.title}</Brief>
                        </Item>
                        <Item
                            align="top"
                            onClick={() => {
                                this.props.history.push({
                                    pathname: "/member/message/notice",
                                    state: {
                                        title: "公告信息"
                                    }
                                });
                            }}
                            extra={message.create_time}
                            thumb={
                                <img
                                    src={gear}
                                    alt="icon"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            }
                            multipleLine
                        >
                            系统通知 <Brief>{message.title}</Brief>
                        </Item>
                    </List>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Message));
