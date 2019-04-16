import React, { PureComponent } from "react";
import NavBar from "components/NavBar";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import StepContainer from "./StepContainer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Toast } from "antd-mobile";
import axios from "axios";
import * as api from "api";

class Trial extends PureComponent {
    constructor(props) {
        super(props);
        this._fetchData(props.token);
    }

    state = {
        accountMoney: 0,
        setting: []
    };
    _fetchData = token => {
        axios.post(`${api.PAGE_TRAIL}`, { token }).then(res => {
            if (res.data.status === "1")
                this.setState({
                    accountMoney: res.data.data.account_money,
                    setting: res.data.data.setting
                });
        });
    };
    onSubmit = () => {
        const { isLogin, token, history } = this.props;
        if (!isLogin) return Toast.fail("请先登录");
        Toast.loading("", 0);
        axios.post(`${api.APPLY_TRIAL}`, { token, type: 4 , deposit_money: 3000}).then(res => {
            Toast.hide();
            if (res.data.status === "1") {
                Toast.info("申请成功", 1, () => {
                    history.push("/member/peizi/list/index");
                });
            } else {
                Toast.fail(res.data.message);
            }
        }).catch(err => {
            Toast.hide();
        });
    };
    render() {
        const { isLogin,mobile } = this.props;
        const { accountMoney,setting } = this.state;

        return (
            <DocumentTitle title="免费体验">
                <React.Fragment>
                    <NavBar
                        left={
                            <Icon
                                type="left"
                                style={{ width: "30px", height: "30px" }}
                            />
                        }
                        onLeftClick={() => window.history.go(-1)}
                    >
                        免费体验
                    </NavBar>
                    <StepContainer setting={setting} onSubmit={this.onSubmit} accountMoney={accountMoney} isLogin={isLogin} mobile={mobile}/>
                </React.Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.isLogin,
    mobile: state.mobile,
    token: state.token
});

export default withRouter(connect(mapStateToProps)(Trial));
