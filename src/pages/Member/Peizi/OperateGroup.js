import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeSubAccount } from "actions/trade";
import { Toast } from "antd-mobile";
class OperateGroup extends Component {
    componentDidMount() {
        this.dispatchSubAccount = false;
    }

    componentDidUpdate() {
        // 跳转到实盘条件  props的subAccount 与 redux里 accountMoney 的 id 一致，即可满足跳转条件
        const { subAccount, accountMoney, history } = this.props;
        if (this.dispatchSubAccount && accountMoney.id === subAccount.id) {
            history.push("/trade/account/index");
            Toast.hide();
        }
    }
    componentWillUnmount() {
        this.dispatchSubAccount = false;
    }

    onGoToTrade = () => {
        const { goToTrade, token, subAccount } = this.props;
        this.dispatchSubAccount = true;
        goToTrade(token, subAccount);
        Toast.loading(null, 0);


    };
    render() {
        const {
            onTerminate,
            stopBtnEnabled,
            waiting,
            notPass,
            isEnd
        } = this.props;

        if (waiting)
            return (
                <StyleWrapper>
                    <ButtonSecondry className="disabled">审核中</ButtonSecondry>
                </StyleWrapper>
            );
        if (notPass)
            return (
                <StyleWrapper>
                    <ButtonSecondry className="disabled">未通过</ButtonSecondry>
                </StyleWrapper>
            );
        if (isEnd)
            return (
                <StyleWrapper>
                    <ButtonSecondry className="disabled">已结束</ButtonSecondry>
                </StyleWrapper>
            );
        if (!stopBtnEnabled) {
            return (
                <StyleWrapper>
                    <ButtonPrimary
                        className="btn-primary"
                        onClick={this.onGoToTrade}
                    >
                        实盘交易
                    </ButtonPrimary>
                </StyleWrapper>
            );
        }
        return (
            <StyleWrapper>
                <ButtonPrimary
                    className="btn-primary"
                    onClick={this.onGoToTrade}
                >
                    实盘交易
                </ButtonPrimary>
                <ButtonSecondry
                    className="stop-btn"
                    onClick={() => onTerminate()}
                >
                    终止操盘
                </ButtonSecondry>
            </StyleWrapper>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    accountMoney: state.accountMoney
});

const mapDispatchToProps = dispatch => ({
    goToTrade: (token, subAccount) => {
        dispatch(changeSubAccount(token, subAccount));
    }
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(OperateGroup)
);

const StyleWrapper = styled.div.attrs({
    className: "weui-tabbar weui-tabbar__fixed footer-fixed"
})`
    display: flex;
`;

const Button = styled.div`
    flex: 1;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    text-align: center;
`;

const ButtonPrimary = styled(Button)`
    background-color: #ff4500;
`;

const ButtonSecondry = styled(Button)`
    background-color: #06aa3a;
    &.disabled {
        background-color: #d4d4d4;
    }
`;
