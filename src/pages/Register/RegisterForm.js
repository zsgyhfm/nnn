import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import SubmitButton from "components/Sign/SignForm/SubmitButton";
import Extra from "components/Sign/SignForm/Extra";
import InputItem from "components/Sign/SignForm/InputItem";
import iconMan from "images/yhm@2x.png";
import iconClock from "images/mima@2x.png";
import iconShield from "images/yzm@2x.png";
import SendMessageBtn from "./SendMessageBtn";
import Agreement from "./Agreement";
import axios from "axios";
import * as api from "api";
import { Toast } from "antd-mobile";
import { loginSuccess } from "actions/login";
import { connect } from "react-redux";
import Validator from "Validator";

class RegisterForm extends PureComponent {
    constructor(props) {
        super(props);

        this._mounted = true;
        this.mobileRef = React.createRef();
        this.captchaRef = React.createRef();
        this.codeRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
        this.recommendRef = React.createRef();
        this.state = {
            timeStamp: Date.now(),
            captcha: "",
            mobile: props.location.state ? props.location.state.mobile : "",
            code: props.location.state ? props.location.state.code : "",
            password: props.location.state ? props.location.state.password : "",
            rePassword: props.location.state
                ? props.location.state.rePassword
                : "",
            recommend: props.location.state
                ? props.location.state.recommend
                : ""
        };
    }
    sendMsg = () => {
        let mobileElement = this.mobileRef.current.el.current;
        let captcha = this.captchaRef.current.el.current.value;
        let mobile = mobileElement.value;
        if (mobile === "") {
            Toast.info("手机号码不能为空");
            mobileElement.focus();
            return false;
        }
        if (! Validator.captcha(captcha)) {
            Toast.info("验证码错误");
            mobileElement.focus();
            return false;
        }
        if (!/^1[345789]\d{9}$/.test(mobile)) {
            Toast.fail("手机号码格式有误");
            mobileElement.focus();
            return false;
        }

        return axios.post(`${api.SEND_SMS}`, {
            mobile: mobile,
            phonecode: captcha,
            template: "sms_tp01"
        });
    };
    handleSubmit = e => {
        const { actLogin, history } = this.props;
        e.preventDefault();
        let validate = this._checkSubmitData();

        if (validate) {
            axios
                .post(`${api.REGISTER}`, {
                    mobile: this.mobileRef.current.el.current.value,
                    sms_code: this.codeRef.current.el.current.value,
                    password: this.passwordRef.current.el.current.value,
                    re_password: this.confirmPasswordRef.current.el.current
                        .value,
                    recommend: this.recommendRef.current.el.current.value
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
                })
                .catch(err => {
                    Toast.fail(err.message);
                });
        }
    };
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeCaptcha = () => {
        this.setState({
            timeStamp: Date.now()
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <InputItem
                    icon={<img src={iconMan} alt="icon" />}
                    type="text"
                    ref={this.mobileRef}
                    name="mobile"
                    placeholder="请输入11位中国大陆手机号"
                    onChange={this.onInputChange}
                    value={this.state.mobile}
                />
                 <InputItem
                    icon={<img src={iconShield} alt="icon" />}
                    type="text"
                    name="captcha"
                    ref={this.captchaRef}
                    placeholder="请输入图片验证码"
                    onChange={this.onInputChange}
                    value={this.state.captcha}
                    extra={ <img onClick={this.changeCaptcha} src={'/captcha?' + this.state.timeStamp} width="120" height="30" alt=""/> }
                />
                <InputItem
                    icon={<img src={iconShield} alt="icon" />}
                    type="text"
                    name="code"
                    ref={this.codeRef}
                    placeholder="请输入短信验证码"
                    onChange={this.onInputChange}
                    value={this.state.code}
                    extra={<SendMessageBtn onClick={this.sendMsg} time="60" />}
                />
                <InputItem
                    icon={<img src={iconClock} alt="icon" />}
                    type="password"
                    ref={this.passwordRef}
                    name="password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    placeholder="请输入登录密码"
                />
                <InputItem
                    icon={<img src={iconClock} alt="icon" />}
                    type="password"
                    ref={this.confirmPasswordRef}
                    name="rePassword"
                    onChange={this.onInputChange}
                    value={this.state.rePassword}
                    placeholder="请再次输入登录密码"
                />
                <InputItem
                    icon={<img src={iconMan} alt="icon" />}
                    type="text"
                    ref={this.recommendRef}
                    name="recommend"
                    onChange={this.onInputChange}
                    value={this.state.recommend}
                    placeholder="推荐人手机号（如无可不填）"
                />
                <Extra>
                    <Agreement
                        mobile={this.state.mobile}
                        code={this.state.code}
                        recommend={this.state.recommend}
                    />
                </Extra>

                <SubmitButton
                    type="submit"
                    onClick={this.handleSubmit}
                    className="login-btn"
                >
                    立即注册
                </SubmitButton>

                <div style={{ textAlign: "right", padding: "20px 0" }}>
                    <Link
                        to="/login"
                        style={{ color: "#459DF5", fontSize: "14px" }}
                    >
                        已有账户，去登录
                    </Link>
                </div>
            </form>
        );
    }

    _checkSubmitData() {
        let mobileElement = this.mobileRef.current.el.current;
        let mobile = mobileElement.value;
        let codeElement = this.codeRef.current.el.current;
        let code = codeElement.value;
        let passwordElement = this.passwordRef.current.el.current;
        let password = passwordElement.value;
        let confirmPasswordElement = this.confirmPasswordRef.current.el.current;
        let confirmPassword = confirmPasswordElement.value;
        let recommendElement = this.recommendRef.current.el.current;
        let recommend = recommendElement.value;

        if (mobile === "") {
            Toast.info("手机号码不能为空");
            mobileElement.focus();
            return false;
        }

        if (!/^1[345789]\d{9}$/.test(mobile)) {
            Toast.fail("手机号码格式有误");
            mobileElement.focus();
            return false;
        }

        if (code === "") {
            Toast.info("验证码不能为空");
            codeElement.focus();
            return false;
        }

        if (code.length !== 6) {
            Toast.info("验证码有误");
            codeElement.focus();
            return false;
        }

        if (password === "") {
            Toast.info("请输入登录密码");
            passwordElement.focus();
            return false;
        }
        if (!Validator.password(password)) {
            Toast.fail("密码长度在 6 - 16之间，必须包含数字、字母");
            return false;
        }
        if (confirmPassword === "") {
            Toast.info("请确认输入登录密码");
            confirmPasswordElement.focus();
            return false;
        }
        if (confirmPassword !== password) {
            Toast.info("密码输入不一致");
            return false;
        }

        if (recommend.length !== 0) {
            if (!/^1[345789]\d{9}$/.test(recommend)) {
                Toast.fail("推荐人手机号码有误");
                recommendElement.focus();
                return false;
            }
        }
        return true;
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
