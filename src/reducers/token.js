import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "actions/action-type";

const token = (state = "", action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.payload.token;
        case LOGOUT_SUCCESS:
            return "";
        default:
            return state;
    }
};

export default token;
