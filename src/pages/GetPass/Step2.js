import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon, List, WhiteSpace, Button, WingBlank, Toast } from "antd-mobile";
import InputItem from "components/Sign/SignForm/InputItem";
import iconShield from "images/yzm@2x.png";
import * as api from "api";
import axios from "axios";
import Validator from "Validator";

const pageTitle = "设置新密码";
class Step2 extends Component {
    constructor(props) {
        super(props);
        const verify = props.location.state && props.location.state.verified;
        if (!verify) props.history.goBack();
        this.newPassword = React.createRef();
        this.newPasswordConfirm = React.createRef();
    }

    onSubmit = () => {
        if (!this.checkSubmit()) return false;
        const { history } = this.props;
        const newPassword = this.newPassword.current.el.current;

        axios.post(`${api.GET_PASS_STEP2}`, {
            mobile: this.props.location.state.mobile,
            password: newPassword.value
        }).then(res => {
            if (res.data.status === "1") {
                Toast.success(res.data.message, 2, () => {
                    history.push({
                        pathname: "/login"
                    });
                })
            } else {
                Toast.fail(res.data.message);
            }
        });
    };
    checkSubmit = () => {
        const newPassword = this.newPassword.current.el.current;
        const newPasswordConfirm = this.newPasswordConfirm.current.el.current;
        if (
            !this._checkPassword(newPassword) ||
            !this._checkNewPassword(newPassword.value, newPasswordConfirm.value)
        ) {
            return false;
        }
        return true;
    };

    _checkPassword = password => {
        if (password.value === "")
            return Toast.info("请输入新密码", 1, null, false);
        if (!Validator.password(password.value))
            return Toast.info(
                "密码长度为6-16位，必须包含数字、字母",
                1,
                null,
                false
            );
        return true;
    };
    _checkNewPassword = (password, confirm) => {
        if (password !== confirm) {
            return Toast.info("两次密码输入不一致", 1, null, false);
        }
        return true;
    };
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => window.history.back(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <List>
                        <InputItem
                            placeholder="请输入新登录密码"
                            padding="10px 15px"
                            icon={<img src={iconShield} alt="icon" />}
                            ref={this.newPassword}
                            type="password"
                        >
                            新登录密码
                        </InputItem>
                        <InputItem
                            icon={<img src={iconShield} alt="icon" />}
                            placeholder="请再次输入新登录密码"
                            ref={this.newPasswordConfirm}
                            padding="10px 15px"
                            type="password"
                        >
                            确认新密码
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <WingBlank>
                        <Button
                            type="primary"
                            onClick={this.onSubmit}
                            style={{ background: "#FF4500" }}
                        >
                            下一步
                        </Button>
                    </WingBlank>
                </Fragment>
            </DocumentTitle>
        );
    }
}
export default withRouter(Step2);
