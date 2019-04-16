import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "actions/action-type";

const memberId = (id = null, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.payload.memberId;
        case LOGOUT_SUCCESS:
            return null;
        default:
            return id;
    }
};

export default memberId;
