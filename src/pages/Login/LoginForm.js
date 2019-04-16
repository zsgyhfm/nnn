import React, { PureComponent } from "react";
import { Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import SubmitButton from "components/Sign/SignForm/SubmitButton";
import axios from "axios";
import { LOGIN } from "api";
import { connect } from "react-redux";
import { loginSuccess } from "actions/login";
import Extra from "components/Sign/SignForm/Extra";
import InputItem from "components/Sign/SignForm/InputItem";
import { Link } from "react-router-dom";
import iconMan from "images/yhm@2x.png";
import iconShield from "images/yzm@2x.png";
import Validator from "Validator";
class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.mobileRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    state = {
        loading: false
    };

    componentDidMount() {
        this.mobile = this.mobileRef.current.el.current;
        this.password = this.passwordRef.current.el.current;
    }

    handleSubmit = e => {
        e.preventDefault();
        const { history, location, actLogin } = this.props;
        let validate = this.validateForm(
            this.mobile.value,
            this.password.value
        );

        if (!validate) return;
        Toast.loading("登录中...", 0, () => {}, true);
        axios({
            method: "post",
            url: LOGIN,
            data: { mobile: this.mobile.value, password: this.password.value }
        }).then(res => {
            Toast.hide();
            if (res.data.status !== "1") return Toast.fail(res.data.message);
            actLogin(res.data.data.token, res.data.data.uid, res.data.data.mobile);
            setTimeout(() => {
                if (location.state && location.state.from) {
                    history.push(location.state.from.pathname);
                } else {
                    history.push("/member/index");
                }
            }, 200);
        });
    };

    validateForm = (mobile, password) => {
        if (mobile.length === 0) {
            Toast.fail("请输入手机号码");
            this.mobile.focus();
            return false;
        }
        if (!/^1[345789]\d{9}$/.test(mobile)) {
            Toast.fail("手机号码格式有误");
            this.mobile.focus();
            return false;
        }
        if (password.length === 0) {
            Toast.fail("请输入密码");
            this.password.focus();
            return false;
        }
        if (!Validator.password(password)) {
            Toast.fail("密码长度在 6 - 16之间,必须包含数字、字母");
            this.password.focus();
            return false;
        }
        return true;
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <InputItem
                    icon={<img src={iconMan} alt="icon" />}
                    type="text"
                    name="telephone"
                    placeholder="请输入手机号码"
                    ref={this.mobileRef}
                />
                <InputItem
                    type="password"
                    icon={<img src={iconShield} alt="icon" />}
                    name="telephone"
                    placeholder="请输入密码"
                    ref={this.passwordRef}
                />

                <Extra>
                    <Link style={{ color: "#459DF5" }} to="/register">
                        马上注册
                    </Link>
                    <Link style={{ color: "#459DF5" }} to="/getpass/step1">
                        忘记密码
                    </Link>
                </Extra>
                <SubmitButton
                    type="submit"
                    disabled={this.state.loading ? "disabled" : ""}
                    className="login-btn"
                >
                    马上登录
                </SubmitButton>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actLogin: (token, memberId, mobile) => dispatch(loginSuccess(token, memberId, mobile))
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(LoginForm)
);
