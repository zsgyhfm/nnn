import React, { PureComponent } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { connect } from "react-redux";
import { Icon, Modal } from "antd-mobile";
import Header from "../components/Header";
import { Route, Link } from "react-router-dom";
import Users from "./Users";
import Commission from "./Commission";
import * as api from "api";
import axios from "axios";
import Invite from "../../components/Invite";
import { FlexPage } from "./Style";
const pageTitle = "代理商管理";
class Index extends PureComponent {
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
            const { agent_rate, count, count_m, url, qrcode } = res.data.data;
            this.setState({
                money: count,
                people: count_m,
                rate: agent_rate,
                inviteLink: url,
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
                <FlexPage>
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
                    <Header
                        money={money}
                        rate={rate}
                        people={people}
                        showInvite={this.inviteFriends}
                    />
                    <Route path="/member/agent/index/users" component={Users} />
                    <Route
                        path="/member/agent/index/commission"
                        component={Commission}
                    />
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
                </FlexPage>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token
});
export default connect(mapStateToProps)(Index);
