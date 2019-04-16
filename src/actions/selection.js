import axios from "axios";
import * as api from "api";
import { Toast } from "antd-mobile";
// 添加自选
const addSelectionActionCreator = stock => ({
    type: "ADD_SELECTION",
    payload: {
        stock
    }
});

export const addSelection = (token, name, code, uid) => {
    return dispatch => {
        axios
            .post(`${api.ADD_SELF_SELECTED}`, { token, name, code, uid })
            .then(res => {
                if (res.data.status === 1) {
                    const stock = res.data.data;
                    axios
                        .get(`${api.STOCK_MARKET}?code=${stock.gupiao_code}`)
                        .then(response => {
                            dispatch(
                                addSelectionActionCreator(response.data.data)
                            );
                        });
                } else {
                    Toast.info(res.data.message, 1, null, false);
                }
            });
    };
};

//删除自选
const deleteSelectionActionCreator = code => ({
    type: "DELETE_SELECTION",
    payload: {
        code
    }
});

export const deleteSelection = (token, code) => {
    return dispatch => {
        axios.post(`${api.DELETE_SELF_SELECTED}`, { token, code }).then(res => {
            if (res.data.status === 1) {
                dispatch(deleteSelectionActionCreator(code));
            } else {
                Toast.info(res.data.message, 1, null, false);
            }
        });
    };
};

// 初始化、重新加载自选
const initSelection = selections => ({
    type: "INIT_SELECTION",
    payload: {
        selections
    }
});

export const fetchSelections = (uid, token) => {
    return dispatch => {
        axios
            .post(`${api.SELF_SELECTED_STOCK}`, {
                uid,
                token
            })
            .then(res => {
                if (
                    res.data.status === 1 &&
                    res.data.data &&
                    res.data.data.length > 0
                ) {
                    dispatch(initSelection(res.data.data));
                }
            });
    };
};
