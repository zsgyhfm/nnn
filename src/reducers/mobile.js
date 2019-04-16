import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "actions/action-type";

const mobile = (number = "", action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.payload.mobile;
        case LOGOUT_SUCCESS:
            return "";
        default:
            return number;
    }
};

export default mobile;
