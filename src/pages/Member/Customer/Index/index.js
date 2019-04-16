import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Modal } from "antd-mobile";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import Wrapper from "./Wrapper";
import Header from "./Header";
import Main from "./Main";
import { Button, ButtonLink } from "./Button";
import Comment from "./Comment";
import BtnGroup from "./BtnGroup";
import TotalData from "./TotalData";
import TextPrimary from "components/Text/TextPrimary";
import * as api from "api";
import axios from "axios";
import { connect } from "react-redux";
import Invite from "../../components/Invite";

const pageTitle = "推广赚钱";
class Index extends Component {
    state = {
        money: 0,
        people: 0,
        rate: 0,
        showModal: false,
        inviteLink: "",
        qrcode: ""
    };
    componentDidMount() {
        this._fetchPageData();
    }
    _fetchPageData() {
        const { token } = this.props;
        axios.post(`${api.AGENT_PAGE}`, { token }).then(res => {
            const {
                agent_rate,
                count,
                count_m,
                url,
                qrcode,
                agent_id
            } = res.data.data;
            this.setState({
                money: count,
                people: count_m,
                rate: agent_rate,
                inviteLink: url,
                agentId: agent_id,
                qrcode
            });
        });
    }
    inviteFriends = () => {
        this.setState({
            showModal: true
        });
    };
    onCloseModal = () => {
        this.setState({
            showModal: false
        });
    };
    render() {
        const { money, people, rate } = this.state;

        return (
            <DocumentTitle title={pageTitle}>
                <Wrapper>
                    <NavBar
                        left={
                            <Link to="/member/index">
                                <Icon
                                    type="left"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            </Link>
                        }
                        background="#FF6C3D"
                    >
                        {pageTitle}
                    </NavBar>
                    <Header />
                    <Main>
                        <TotalData people={people} money={money} rate={rate} />
                        <BtnGroup>
                            <Button type="primary" onClick={this.inviteFriends}>
                                邀请好友赚佣金
                            </Button>

                            <ButtonLink
                                to="/member/customer/users"
                            >
                                查看推广明细
                            </ButtonLink>
                        </BtnGroup>
                        <Comment>
                            1.
                            推广链接是您对外界进行推广的地址，您可以通过朋友、QQ、
                            微信、博客、论坛或自己的网站进行推广 <br />
                            2.
                            所有通过该地址访问过来的人，注册后都属于您的用户。
                            <br />
                            <TextPrimary>
                                3. 当这些用户在本站配资时，您就可以赚取 {rate}%
                                的佣金。
                            </TextPrimary>
                        </Comment>
                    </Main>
                    <Modal
                        transparent
                        maskClosable={true}
                        onClose={this.onCloseModal}
                        visible={this.state.showModal}
                    >
                        <Invite
                            inviteLink={this.state.inviteLink}
                            qrcode={
                                this.state.qrcode + "?token=" + this.props.token
                            }
                        />
                    </Modal>
                </Wrapper>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Index));
