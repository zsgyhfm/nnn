import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "actions/action-type";

const isLogin = (state = false, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return true;
        case LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
};

export default isLogin;
