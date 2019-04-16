import { LOGOUT_SUCCESS } from "actions/action-type";

// 子账户列表
export const subAccounts = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_SUB_ACCOUNTS":
            return action.payload;
        case LOGOUT_SUCCESS:
            return [];
        default:
            return state;
    }
};

export const subAccount = (account = {}, action) => {
    switch (action.type) {
        case "SELECT_SUB_ACCOUNT":
            return action.payload;
        case LOGOUT_SUCCESS:
            return {};
        default:
            return account;
    }
};

export const subAccountMoney = (account = {}, action) => {
    switch (action.type) {
        case "UPDATE_SUB_ACCOUNT_MONEY":
            return action.payload;
        case LOGOUT_SUCCESS:
            return {};
        default:
            return account;
    }
};
