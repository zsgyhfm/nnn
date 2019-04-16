import React, { PureComponent, Fragment } from "react";
import NavBar from "components/NavBar";
import { connect } from "react-redux";
import { withRouter,Link } from "react-router-dom";
import Validator from "Validator";
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
import * as api from "api";

const pageTitle = "修改支付密码";

class PayPass extends PureComponent {
    constructor(props) {
        super(props);
        this.oldPayPass = React.createRef();
        this.newPayPass = React.createRef();
        this.newPayPassConfirm = React.createRef();
    }
    onSubmit = () => {
        const { token, history } = this.props;
        const oldPayPass = this.oldPayPass.current.state.value;
        const newPayPass = this.newPayPass.current.state.value;
        const newPayPassConfirm = this.newPayPassConfirm.current.state.value;
        if (!this._checkForm(oldPayPass, newPayPass, newPayPassConfirm)) {
            return false;
        }
        axios
            .post(`${api.EDIT_PAY_PASS}`, {
                token,
                oldpwd: oldPayPass,
                newpwd: newPayPass,
                subpwd: newPayPassConfirm
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
    _checkForm(oldPayPass, newPayPass, newPayPassConfirm) {
        if (!Validator.paypass(oldPayPass)) {
            Toast.info("原支付密码输入有误", 1, null, false);
            return false;
        }
        if (!Validator.paypass(newPayPass)) {
            Toast.info("支付密码长度应为6位数字", 1, null, false);
            return false;
        }
        if (newPayPass !== newPayPassConfirm) {
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
                            placeholder="初始默认为手机号后6位"
                            ref={this.oldPayPass}
                            type="password"
                            style={{ textAlign: "right" }}
                        >
                            原支付密码
                        </InputItem>
                        <InputItem
                            ref={this.newPayPass}
                            placeholder="请输入新支付密码"
                            type="password"
                            style={{ textAlign: "right" }}
                        >
                            新支付密码
                        </InputItem>
                        <InputItem
                            ref={this.newPayPassConfirm}
                            placeholder="请再次输入新支付密码"
                            type="password"
                            style={{ textAlign: "right" }}
                        >
                            确认新密码
                        </InputItem>
                    </List>
                    <WhiteSpace size="xl" />

                    <WingBlank>
                        <Button
                            type="primary"
                            onClick={this.onSubmit}
                            style={{ background: "#FF4500" }}
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
export default withRouter(connect(mapStateToProps)(PayPass));
