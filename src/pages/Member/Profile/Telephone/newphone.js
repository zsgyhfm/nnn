import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import Validator from "Validator";
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

const pageTitle = "新手机号码";

class NewPhone extends PureComponent {
    constructor(props) {
        super(props);
        this.mobileRef = React.createRef();
        this.codeRef = React.createRef();
    }
    componentDidMount() {
        this.mobile = this.mobileRef.current.inputRef.inputRef;
        this.code = this.codeRef.current.inputRef.inputRef;
    }

    sendSms = () => {
        if (this._validateMobile())
            return axios.post(`${api.SEND_SMS}`, {
                mobile: this.mobile.value,
                template: "sms_tp01"
            });
    };

    onSubmit = () => {
        const { history } = this.props;
        if (!this._validateMobile()) return;
        if (!this._validateCode()) return;
        Toast.loading();
        axios
            .post(`${api.CHANGE_MOBILE}`, {
                new_mobile: this.mobile.value,
                token: this.props.token,
                captcha: this.code.value,
                step: 2
            })
            .then(res => {
                Toast.hide();
                if (res.data.status === "1") {
                    history.push("/member/index");
                } else {
                    Toast.info(res.data.message);
                }
            })
            .catch(err => {
                Toast.hide();
            });
    };

    _validateCode() {
        const code = this.code;
        if (code.value.length === 0) {
            code.focus();
            Toast.info("请输入短信验证码");
            return false;
        }
        if (code.value.length !== 6) {
            code.focus();
            Toast.info("短信验证码有误");
            return false;
        }
        return true;
    }
    _validateMobile() {
        const mobile = this.mobile.value;
        if (mobile.length === 0) {
            Toast.fail("请输入新手机号码");
            this.mobile.focus();
            return false;
        }
        if (!Validator.mobile(mobile)) {
            Toast.fail("手机号码格式有误");
            this.mobile.focus();
            return false;
        }
        return true;
    }
    render() {
        const btnDisabled = false;
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
                        onLeftClick={() => window.history.go(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <List>
                        <InputItem
                            placeholder="请输入新手机号码"
                            style={{ textAlign: "right" }}
                            ref={this.mobileRef}
                        >
                            新手机号码
                        </InputItem>

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
                            disabled={btnDisabled ? "disabled" : ""}
                            style={{ background: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            确认更改
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
export default withRouter(connect(mapStateToProps)(NewPhone));
