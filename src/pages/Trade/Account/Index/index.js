import React, { Component, Fragment } from "react";
import Footer from "components/Footer/";
import PageContainer from "components/PageContainer";
import NavBar from "components/NavBar";
import AccountTitle from "../components/AccountTitle";
import DocumentTitle from "react-document-title";
import Header from "./Header";
import GridLink from "./GridLink";
import StockLine from "./StockLine";
import { List } from "antd-mobile";
import yingkui from "images/yingkui@2x.png";
import yxrq from "images/yxrq@2x.png";
import StockColorText from "components/Text/StockColorText";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { numberFormat } from "../../../../util";
import { getSubAccountMoney } from "actions/trade";

class Index extends Component {
    componentDidMount() {
        const { token, subAccount, updateSubAccount } = this.props;
        updateSubAccount(token, subAccount);

        this.timer = setInterval(() => {
            updateSubAccount(token, subAccount);
        }, 10000);
    }
    componentDidUpdate(prevProps) {
        if (this.props.subAccount.id !== prevProps.subAccount.id) {
            const { token, subAccount, updateSubAccount } = this.props;
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                updateSubAccount(token, subAccount);
            }, 10000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const { isLogin, subAccount, history } = this.props;
        return (
            <DocumentTitle title="交易">
                <Fragment>
                    <div >
                        <NavBar>
                            <AccountTitle />
                        </NavBar>
                        <PageContainer >
                            <Header isLogin={isLogin} subAccount={subAccount} />
                            <GridLink />
                            {subAccount.type !== 4 ? (
                                <StockLine
                                    warnLine={
                                        subAccount.loss_warn_money
                                            ? numberFormat(
                                            subAccount.loss_warn_money
                                            )
                                            : "--"
                                    }
                                    closeLine={
                                        subAccount.loss_close_money
                                            ? numberFormat(
                                            subAccount.loss_close_money
                                            )
                                            : "--"
                                    }
                                />
                            ) : null}
                            <List>
                                <List.Item
                                    thumb={yingkui}
                                    extra={
                                        <StockColorText
                                            base={subAccount.return_money}
                                        >
                                            {subAccount.return_money}元{" "}
                                        </StockColorText>
                                    }
                                >
                                    目前总盈亏金额
                                </List.Item>
                                <List.Item
                                    thumb={yxrq}
                                    extra={
                                        subAccount.end_time
                                            ? subAccount.end_time
                                            : "--"
                                    }
                                    arrow={subAccount.borrow_id ? "horizontal" : ""}
                                    onClick={() => {
                                        subAccount.borrow_id &&
                                        history.push({
                                            pathname: `/member/peizi/detail/${
                                                subAccount.borrow_id
                                                }`
                                        });
                                    }}
                                >
                                    账号有效期{" "}
                                    {subAccount.type === 4 || subAccount.type === 5
                                        ? null
                                        : "(自动续期)"}
                                </List.Item>
                            </List>
                        </PageContainer>
                    </div>
                    <Footer />
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.isLogin,
    token: state.token,
    subAccount: state.accountMoney
});

const mapDispatchToProps = dispatch => ({
    updateSubAccount: (token, subAccount) => {
        dispatch(getSubAccountMoney(token, subAccount.id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Index)
);
