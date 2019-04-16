import { LOGIN_SUCCESS } from "actions/action-type";

export const loginSuccess = (token, memberId, mobile) => ({
    type: LOGIN_SUCCESS,
    payload: { token, memberId, mobile }
});
