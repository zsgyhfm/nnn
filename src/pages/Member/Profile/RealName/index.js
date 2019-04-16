import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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

const pageTitle = "实名认证";

class RealName extends PureComponent {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.idCardRef = React.createRef();
    }
    state = {
        realname: null,
        idCard: null,
        isAuth: 0
    };
    componentDidMount() {
        const { token } = this.props;
        this._fetchUserInfo(token);
        this.name = this.nameRef.current.inputRef.inputRef;
        this.idCard = this.idCardRef.current.inputRef.inputRef;
    }

    _fetchUserInfo = token => {
        axios.post(`${api.USER_INFO}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    realname: res.data.data.name,
                    idCard: res.data.data.id_card,
                    isAuth: res.data.data.id_auth
                });
            }
        });
    };

    onSubmit = () => {
        const { token } = this.props;
        const validate = this._validateForm();
        if (!validate) return;
        axios
            .post(`${api.REAL_NAME}`, {
                token,
                name: this.name.value,
                id_card: this.idCard.value
            })
            .then(res => {
                Toast.info(res.data.message, 1, () => {
                    if (res.data.status === "1") window.location.reload();
                });
            });
    };

    _validateForm = () => {
        if (!this._validateName(this.name.value)) {
            Toast.info("真实姓名有误", 1, null, false);

            return false;
        }
        if (!Validator.idCard(this.idCard.value)) {
            Toast.info("身份证号码有误", 1, null, false);
            return false;
        }
        return true;
    };
    _validateName = name => {
        if (name.length === 0) return false;
        return true;
    };

    render() {
        const { realname, idCard, isAuth } = this.state;
        let disabled = false;
        let buttonText = "确认提交";

        if (isAuth === 1) {
            buttonText = "已认证，无法修改";
            disabled = true;
        }
        if (isAuth === 2) buttonText = "认证失败，请重新认证";
        if (isAuth === 0 && idCard !== "" && realname !== "") {
            buttonText = "审核中";
            disabled = true;
        }

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
                            placeholder={
                                realname ? realname : "请输入您的真实姓名"
                            }
                            ref={this.nameRef}
                            disabled={disabled ? "disabled" : ""}
                            style={{ textAlign: "right" }}
                        >
                            真实姓名
                        </InputItem>

                        <InputItem
                            placeholder={
                                idCard ? idCard : "请输入您的18位身份证号"
                            }
                            ref={this.idCardRef}
                            style={{ textAlign: "right" }}
                            disabled={disabled ? "disabled" : ""}
                        >
                            身份证号
                        </InputItem>
                    </List>
                    <WhiteSpace size="xl" />

                    <WingBlank>
                        <Button
                            type="primary"
                            onClick={this.onSubmit}
                            style={{ background: "#FF4500" }}
                            disabled={disabled ? "disabled" : ""}
                        >
                            {buttonText}
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

export default withRouter(connect(mapStateToProps)(RealName));
