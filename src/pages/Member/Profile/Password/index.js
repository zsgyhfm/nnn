import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter,Link } from "react-router-dom";
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
import * as api from "api";
const pageTitle = "修改登录密码";

class Password extends PureComponent {
    constructor(props) {
        super(props);
        this.oldPassword = React.createRef();
        this.newPassword = React.createRef();
        this.newPasswordConfirm = React.createRef();
    }
    onSubmit = () => {
        const { token, history } = this.props;
        const oldPassword = this.oldPassword.current.state.value;
        const newPassword = this.newPassword.current.state.value;
        const newPasswordConfirm = this.newPasswordConfirm.current.state.value;
        if (!this._checkForm(oldPassword, newPassword, newPasswordConfirm)) {
            return false;
        }
        axios
            .post(`${api.EDIT_PASSWORD}`, {
                token,
                oldpwd: oldPassword,
                newpwd: newPassword,
                subpwd: newPasswordConfirm
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success("密码修改成功", 1, () => {
                        history.push("/member/profile/index");
                    });
                } else {
                    Toast.fail(res.data.message, 1, null, false);
                }
            });
    };
    _checkForm(oldPassword, newPassword, newPasswordConfirm) {
        if (!Validator.password(oldPassword)) {
            Toast.info("原登录密码输入有误", 1, null, false);
            return false;
        }
        if (!Validator.password(newPassword)) {
            Toast.info("登录密码长度为6-16位，必须包含数字、字母", 1, null, false);
            return false;
        }
        if (newPassword !== newPasswordConfirm) {
            Toast.info("两次新密码输入不一致", 1, null, false);
            return false;
        }
        return true;
    }
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/member/profile/index">
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
                        <InputItem
                            placeholder="请输入原登录密码"
                            ref={this.oldPassword}
                            style={{ textAlign: "right" }}
                            type="password"
                        >
                            原登录密码
                        </InputItem>
                        <InputItem
                            placeholder="请输入新登录密码"
                            ref={this.newPassword}
                            style={{ textAlign: "right" }}
                            type="password"
                        >
                            新登录密码
                        </InputItem>
                        <InputItem
                            placeholder="请再次输入新登录密码"
                            ref={this.newPasswordConfirm}
                            style={{ textAlign: "right" }}
                            type="password"
                        >
                            确认新密码
                        </InputItem>
                    </List>
                    <WhiteSpace size="xl" />

                    <WingBlank>
                        <Button
                            type="primary"
                            style={{ background: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            确认提交
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
export default withRouter(connect(mapStateToProps)(Password));
