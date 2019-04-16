import React, { Component, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon, List, WhiteSpace, Button, WingBlank, Toast } from "antd-mobile";
import InputItem from "components/Sign/SignForm/InputItem";
import iconMan from "images/yhm@2x.png";
import iconShield from "images/yzm@2x.png";
import SendMessageBtn from "../Register/SendMessageBtn";
import * as api from "api";
import axios from "axios";
import Validator from "Validator";
import { withRouter } from "react-router-dom";

const pageTitle = "找回密码";
class Step1 extends Component {
    constructor(props) {
        super(props);
        this.mobileRef = React.createRef();
        this.codeRef = React.createRef();
        this.captchaRef = React.createRef();
        this.state = {
            captcha: "", 
        }
    }
    sendMsg = fn => {
        const mobile = this.mobileRef.current.el.current;
        const captcha = this.captchaRef.current.el.current.value; 
        if (this._checkMobile(mobile)) {
            return axios.post(`${api.SEND_PASS_SMS}`, {
                template: "sms_tp02",
                mobile: mobile.value,
                phonecode: captcha
            });
        }
        if (! Validator.captcha(captcha)) {
            Toast.info("验证码错误"); 
            return false;
        }
        
    };
    onSubmit = () => {
        const mobile = this.mobileRef.current.el.current;
        const code = this.codeRef.current.el.current;
        const captcha = this.captchaRef.current.el.current; 
        const { history } = this.props;
        if (!this._checkSubmit(mobile, code,captcha)) return false;
        axios
            .post(`${api.GET_PASS_STEP1}`, {
                mobile: mobile.value,
                sms_code: code.value
            })
            .then(res => {
                if (res.data.status === "1") {
                    history.push({
                        pathname: "/getpass/step2",
                        state: {
                            verified: true,
                            mobile: mobile.value
                        }
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    _checkSubmit = (mobile, code,captcha) => {
        if ( this._checkMobile(mobile) &&  this._checkCaptcha(captcha) && this._checkCode(code)  ) return true;
   
        return false;
    };

    _checkMobile = mobile => {
        if (mobile.value === "")
            return Toast.info("请输入手机号码", 1, null, false);
        if (!Validator.mobile(mobile.value))
            return Toast.info("手机号码有误", 1, null, false);
        return true;
    };
    _checkCaptcha = captcha  => {
        if (captcha.value === "")
            return Toast.info("请输入图形验证码", 1, null, false);
        if (captcha.value.length !== 6)
            return Toast.info("图形验证码输入有误", 1, null, false);
        return true;
    }
    _checkCode = code => {
        if (code.value === "")
            return Toast.info("请输入短信验证码", 1, null, false);
        if (code.value.length !== 6)
            return Toast.info("短信验证码输入有误", 1, null, false);
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
                            icon={<img src={iconMan} alt="icon" />}
                            type="text"
                            ref={this.mobileRef}
                            name="telephone"
                            placeholder="请输入您的手机号码"
                            padding="10px 15px"
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
                                padding="10px 15px"
                           />
                        <InputItem
                            icon={<img src={iconShield} alt="icon" />}
                            type="text"
                            name="code"
                            ref={this.codeRef}
                            placeholder="请输入短信验证码"
                            extra={
                                <SendMessageBtn
                                    onClick={this.sendMsg}
                                    time="60"
                                />
                            }
                            padding="10px 15px"
                        />
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
export default withRouter(Step1);
