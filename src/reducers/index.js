import { combineReducers } from "redux";
import selection from "./selection";
import banner from "./banner";
import pages from "./pages";
import token from "./token";
import isLogin from "./isLogin";
import memberId from "./memberId";
import mobile from "./mobile";
import stockIndex from "./stockIndex";
import pop from "./Pop"
import {
    subAccount,
    subAccounts,
    subAccountMoney as accountMoney
} from "./trade";

const rootReducer = combineReducers({
    selection,
    banner,
    pages,
    isLogin,
    token,
    memberId,
    mobile,
    subAccounts,
    subAccount,
    stockIndex,
    accountMoney,
    pop
});

export default rootReducer;
