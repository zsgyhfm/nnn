import React, { PureComponent, Fragment } from "react";
import NavBar from "components/NavBar";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import {
    Icon,
    List,
    Button,
    WhiteSpace,
    WingBlank,
    InputItem,
    Toast
} from "antd-mobile";
import axios from "axios";
import SendMsgBtn from "components/SendMsgBtn";
import * as api from "api";

const pageTitle = "修改手机号码";

class Telephone extends PureComponent {
    constructor(props) {
        super(props);
        this.codeRef = React.createRef();
    }
    state = {
        mobile: null
    };

    componentDidMount() {
        this._isMounted = true;
        const { token } = this.props;
        this._fetchUserInfo(token);
    }

    sendSms = () => {
        const { mobile } = this.state;
        if (!mobile) {
            Toast.fail("当前账号手机号码有误");
            return false;
        }
        return axios.post(`${api.SEND_SMS}`, { mobile, template: "sms_tp01" });
    };

    _fetchUserInfo = token => {
        axios.post(`${api.USER_INFO}`, { token }).then(res => {
            if (res.data.status === "1" && this._isMounted) {
                this.setState({
                    mobile: res.data.data.mobile
                });
            }
        });
    };
    componentWillUnmount() {
        this._isMounted = false;
    }

    onSubmit = () => {
        const { history } = this.props;
        const code = this.codeRef.current.inputRef.inputRef;
        if (code.value.length === 0) {
            code.focus();
            return Toast.info("请输入短信验证码");
        }
        if (code.value.length !== 6) {
            code.focus();
            return Toast.info("短信验证码有误");
        }
        Toast.loading();
        axios
            .post(`${api.CHANGE_MOBILE}`, {
                mobile: this.state.mobile,
                token: this.props.token,
                captcha: code.value
            })
            .then(res => {
                Toast.hide();
                if (res.data.status === "1") {
                    history.push("/member/profile/newphone");
                } else {
                    Toast.info(res.data.message);
                }
            })
            .catch(err => {
                Toast.hide();
            });
    };

    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/member/profile/index">
                                <Icon type="left" style={{ width: "30px", height: "30px" }} />
                            </Link>
                        }
                    >
                        {pageTitle}
                    </NavBar>
                    <List>
                        <List.Item
                            extra={
                                <div style={{ color: "#252525" }}>
                                    {this.state.mobile}
                                </div>
                            }
                        >
                            原手机号码
                        </List.Item>
                        <InputItem
                            placeholder="请输入验证码"
                            style={{ textAlign: "right" }}
                            ref={this.codeRef}
                            extra={
                                <SendMsgBtn
                                    duration={60}
                                    onSend={this.sendSms}
                                />
                            }
                        >
                            短信验证码
                        </InputItem>
                    </List>
                    <WhiteSpace size="xl" />

                    <WingBlank>
                        <Button
                            type="primary"
                            disabled={!this.state.mobile ? "disabled" : ""}
                            style={{ background: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            下一步
                        </Button>
                    </WingBlank>
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Telephone));
