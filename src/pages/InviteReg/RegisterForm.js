import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { InputGroup } from "./styles";
import { Toast } from "antd-mobile";
import InputItem from "./InputItem";
import iconMan from "images/icon-man-orange.png";
import iconLock from "images/icon-lock-orange.png";
import iconShield from "images/icon-shield-orange.png";
import SendMsgBtn from "./../../components/SendMsgBtn";
import axios from "axios";
import * as api from "api";
import Validator from "Validator";
import { connect } from "react-redux";
import { loginSuccess } from "actions/login";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.mobileRef = React.createRef();
        this.captchaRef = React.createRef();
        this.codeRef = React.createRef();
        this.passwordRef = React.createRef();
        this.rePasswordRef = React.createRef();
        this.state = {
            captcha: "",
            timeStamp: Date.now(),
            canSubmit: true
        };
    }
    sendSms = () => {
        let captcha = this.captchaRef.current.el.current.value;
        const mobile = this.mobileRef.current.el.current.value;
        if (!this._checkSendSms(mobile, captcha)) return false;
        return axios.post(`${api.SEND_SMS}`, {
            mobile: mobile,
            phonecode: captcha,
            template: "sms_tp01"
        });
    };
    changeCaptcha = () => {
        this.setState({
            timeStamp: Date.now()
        });
    };
    submit = e => {
        e.preventDefault();
        if (!this.state.canSubmit) return;

        const { match, actLogin, history } = this.props;
        if (match.params.code === "") {
            return Toast.fail("注册链接错误，请重新获取链接注册");
        }
        const mobile = this.mobileRef.current.el.current.value;
        const code = this.codeRef.current.el.current.value;
        const password = this.passwordRef.current.el.current.value;
        const rePassword = this.rePasswordRef.current.el.current.value;
        if (!this._checkSubmit(mobile, code, password, rePassword))
            return false;
        this.setState({
            canSubmit: false
        });
        axios
            .post(`${api.REGISTER}`, {
                mobile: mobile,
                sms_code: code,
                password: password,
                re_password: rePassword,
                recom_id: match.params.code
            })
            .then(res => {
                if (res.data.status === "1") {
                    actLogin(
                        res.data.data.token,
                        res.data.data.uid,
                        res.data.data.mobile
                    );
                    Toast.success("注册成功", 1, () => {
                        history.push("/member/index");
                    });
                } else {
                    Toast.fail(res.data.message);
                }
                this.setState({
                    canSubmit: true
                });
            })
            .catch(err => {
                this.setState({
                    canSubmit: true
                });
            });
    };

    _checkSendSms = (mobile, captcha) => {
        if (!this._checkMobile(mobile)) return false;
        if (!Validator.captcha(captcha)) {
            Toast.info("验证码错误");
            return false;
        }
        return true;
    };
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    _checkSubmit = (mobile, code, password, rePassword) => {
        if (
            !this._checkMobile(mobile) ||
            !this._checkCode(code) ||
            !this._checkPassword(password) ||
            !this._checkRePassword(password, rePassword)
        )
            return false;
        return true;
    };

    _checkMobile = mobile => {
        if (mobile.length === 0)
            return Toast.info("请输入手机号码", 1, null, false);
        if (!Validator.mobile(mobile))
            return Toast.info("手机号码错误", 1, null, false);
        return true;
    };
    _checkPassword = password => {
        if (password.length === 0)
            return Toast.info("请输入登录密码", 1, null, false);

        if (!Validator.password(password))
            return Toast.info(
                "密码格式错误，密码为6-16位，必须包含数字和字母",
                2,
                null,
                false
            );
        return true;
    };
    _checkRePassword(password, rePassword) {
        if (rePassword.length === 0)
            return Toast.info("请重复输入登录密码", 1, null, false);

        if (password !== rePassword)
            return Toast.info("登录密码不一致", 1, null, false);
        return true;
    }
    _checkCode = code => {
        if (code.length === 0)
            return Toast.info("请输入短信验证码", 1, null, false);

        if (!Validator.msgCode(code))
            return Toast.info("短信验证码错误", 1, null, false);
        return true;
    };
    render() {
        return (
            <StyleWrapper onSubmit={this.submit}>
                <InputGroup>
                    <InputItem
                        ref={this.mobileRef}
                        label={<img src={iconMan} alt="icon" />}
                        type="phone"
                        placeholder="请输入11位中国大陆手机号"
                    />
                    <InputItem
                        icon={<img src={iconShield} alt="icon" />}
                        type="text"
                        label={<img src={iconShield} alt="icon" />}
                        name="captcha"
                        ref={this.captchaRef}
                        placeholder="请输入图片验证码"
                        onChange={this.onInputChange}
                        value={this.state.captcha}
                        extra={
                            <img
                                onClick={this.changeCaptcha}
                                src={"/captcha?" + this.state.timeStamp}
                                width="100%"
                                height="100%"
                                alt=""
                            />
                        }
                    />
                    <InputItem
                        ref={this.codeRef}
                        placeholder="请输入短信验证码"
                        label={<img src={iconShield} alt="icon" />}
                        extra={
                            <SendMsgBtn duration={60} onSend={this.sendSms} />
                        }
                    />
                    <InputItem
                        ref={this.passwordRef}
                        label={<img src={iconLock} alt="icon" />}
                        type="password"
                        placeholder="请输入您的登录密码"
                    />

                    <InputItem
                        ref={this.rePasswordRef}
                        label={<img src={iconLock} alt="icon" />}
                        type="password"
                        placeholder="请重复输入登录密码"
                    />
                    <SubmitButton
                        type="submit"
                        value="立即注册"
                        disabled={this.state.canSubmit ? "" : "disabled"}
                    />
                </InputGroup>
            </StyleWrapper>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actLogin: (token, memberId, mobile) =>
        dispatch(loginSuccess(token, memberId, mobile))
});
export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(RegisterForm)
);

const StyleWrapper = styled.form`
    padding: 20px 15px 50px;
`;
const SubmitButton = styled.input`
    width: 100%;
    border: none;
    border-radius: 5px;
    line-height: 44px;
    margin-top: 10px;
    background-color: ${props => (props.disabled ? "#f19427" : "#FBC02D")};
    color: ${props => (props.disabled ? "#fff" : "#ff4500")};
    font-size: 16px;
    box-shadow: 0 4px 0 ${props => (props.disabled ? "#b3521a" : "#ff4500")};

    ::before {
        content: " ";
    }
`;
