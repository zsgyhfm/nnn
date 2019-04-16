import React, { Component } from "react";
import styled from "styled-components";
import { Icon, Picker } from "antd-mobile";
import {
    subAccounts,
    changeSubAccount as changeSubAccountAction
} from "actions/trade";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const StyleWrapper = styled.div`
    display: flex;
`;
const Account = styled.span`
    border: 1px solid #ffae90;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    line-height: 20px;
    padding: 0 10px;
    white-space: nowrap;
    border-radius: 4px;
`;

class AccountTitle extends Component {
    componentDidMount() {
        const { getSubAccounts, token, account } = this.props;
        getSubAccounts(token, account.id);
    }
    render() {
        const { account, subAccounts, selectSubAccount, token } = this.props;

        const formatSubAccounts = subAccounts.map(item => ({
            label: item.sub_account,
            value: item.id
        }));
        return (
            <StyleWrapper>
                <div>交易账号</div>
                <Picker
                    data={formatSubAccounts}
                    cols="1"
                    onChange={account =>
                        selectSubAccount(account, subAccounts, token)
                    }
                    disabled={subAccounts.length === 0}
                >
                    <Account>
                        <span>
                            {account.sub_account ? account.sub_account : "无交易子账号"}
                        </span>{" "}
                        {subAccounts.length === 0 ? null : (
                            <Icon
                                style={{ position: "relative", top: "2px" }}
                                type="down"
                                size="xxs"
                            />
                        )}
                    </Account>
                </Picker>
            </StyleWrapper>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    account: state.subAccount,
    subAccounts: state.subAccounts
});

const mapDispatchToProps = dispatch => ({
    selectSubAccount: (accountId, subAccounts, token) => {
        const account = subAccounts.find(item => item.id === accountId[0]);
        dispatch(changeSubAccountAction(token, account));
    },
    getSubAccounts: (token, subAccount) => {
        dispatch(subAccounts(token, subAccount));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountTitle)
);
