import React, { PureComponent, Fragment } from "react";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import {
    Icon,
    List,
    Button,
    WhiteSpace,
    WingBlank,
    Toast,} from "antd-mobile";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import TextBlue from "components/Text/TextBlue";
import logoutSuccess from "actions/logout";
import axios from "axios";
import * as api from "api";
import Avatar from "./Avatar";
import {hideNumber} from '../../../../util'
const pageTitle = "账户资料";

class Index extends PureComponent {
    state = {
        mobile: "",
        realname: "",
        idCard: "",
        isAuth: 0,
        bankStatus: 0,
        showAvatarUploader: false,
        avatarImage: ""
    };

    componentDidMount() {
        const { token } = this.props;
        this._fetchUserInfo(token);
        this._fetchBankStatus(token);
    }
    _fetchUserInfo = token => {
        axios.post(`${api.USER_INFO}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    mobile: res.data.data.mobile,
                    realname: res.data.data.name,
                    idCard: res.data.data.id_card,
                    isAuth: res.data.data.id_auth,
                    avatarImage: res.data.data.head_img
                });
            }
        });
    };
    showUploadAvatar = () => {
        this.setState({
            showAvatarUploader: true
        });
    };

    _fetchBankStatus = token => {
        axios.post(`${api.BANK_LIST}`, { token }).then(res => {
            if (res.data.data && res.data.data.banks.length > 0) {
                this.setState({
                    bankStatus: 1
                });
            }
        });
    };
    render() {
        const { history, logout } = this.props;
        const {
            mobile,
            realname,
            isAuth,
            idCard,
            bankStatus,
            avatarImage
        } = this.state;
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
                        <List.Item extra={<Avatar image={avatarImage} />}>
                            头像
                        </List.Item>
                        <List.Item
                            onClick={() => {
                                history.push("/member/profile/telephone");
                            }}
                            extra={hideNumber(mobile, 'telephone')}
                            arrow="horizontal"
                        >
                            手机号码
                        </List.Item>
                        <List.Item
                            onClick={() => {
                                history.push("/member/profile/realname");
                            }}
                            extra={
                                isAuth === 0 || isAuth === 2
                                    ? "未认证"
                                    : `${realname} | ${hideNumber(idCard, 'idCard')}`
                            }
                            arrow="horizontal"
                        >
                            实名认证
                        </List.Item>
                        <List.Item
                            onClick={() => {
                                history.push("/member/profile/bank/index");
                            }}
                            extra={bankStatus === 0 ? "未设置" : "已设置"}
                            arrow="horizontal"
                        >
                            提现银行卡
                        </List.Item>
                    </List>
                    <WhiteSpace />
                    <List>
                        <List.Item
                            onClick={() => {
                                history.push("/member/profile/password");
                            }}
                            extra={<TextBlue>修改</TextBlue>}
                            arrow="horizontal"
                        >
                            登录密码
                        </List.Item>
                        <List.Item
                            onClick={() => {
                                history.push("/member/profile/paypass");
                            }}
                            extra={<TextBlue>修改</TextBlue>}
                            arrow="horizontal"
                        >
                            支付密码
                        </List.Item>
                    </List>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button
                            type="primary"
                            style={{ background: "#FF4500" }}
                            onClick={() => logout(history)}
                        >
                            退出登录
                        </Button>
                    </WingBlank>
                    {/* <Modal
                        visible={this.state.showAvatarUploader}
                        transparent={true}
                        maskClosable={false}
                        closable={true}
                        onClose={() => {
                            this.setState({
                                showAvatarUploader: false
                            });
                        }}
                    >
                        <div className="wrapper">
                            <label htmlFor="avatar">
                                <div>
                                    
                                </div>
                                <input
                                    type="file"
                                    name="avatar"
                                    ref={input => (this.inputElement = input)}
                                    multiple={false}
                                    onChange={this.onUploadAvatar}
                                    accept="image/gif, image/jpeg, image/jpg, image/png"
                                    style={{ display: "none" }}
                                />
                            </label>
                        </div>
                    </Modal> */}
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    logout: (history) => {
        dispatch(logoutSuccess())

        Toast.loading(null, 1, () => {
            history.push("/member/index")
        })
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Index)
);
