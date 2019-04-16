import * as api from "api";
import axios from "axios";

const updateSubAccounts = list => ({
    type: "UPDATE_SUB_ACCOUNTS",
    payload: list
});

const selectSubAccount = account => ({
    type: "SELECT_SUB_ACCOUNT",
    payload: account
});

const updateSubAccountMoney = account => ({
    type: "UPDATE_SUB_ACCOUNT_MONEY",
    payload: account
});

export const subAccounts = (token, subAccount) => {
    return dispatch => {
        axios.post(`${api.GET_SUBACCOUNT}`, { token }).then(res => {
            if (res.data.data && res.data.data.length !== 0) {
                dispatch(updateSubAccounts(res.data.data));
                if (!subAccount) {
                    dispatch(changeSubAccount(token, res.data.data[0]));
                }
            }
        });
    };
};

//更新子账户资金信息、 如产生金额变动、切换子账号等使用
export const getSubAccountMoney = (token, id) => {
    return dispatch => {
        if (id) {
            axios
                .post(`${api.SUBACCOUNT_MONEY_INFO}`, { token, id })
                .then(res => {
                    if (res.data.status === 1)
                        dispatch(updateSubAccountMoney(res.data.data));
                });
        }
    };
};

export const changeSubAccount = (token, subAccount) => {
    return dispatch => {
        dispatch(selectSubAccount(subAccount));
        dispatch(getSubAccountMoney(token, subAccount.id));
    };
};
