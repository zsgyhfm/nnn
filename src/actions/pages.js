import axios from "axios";
import * as api from "../api";

const initPageIndexConfig = payload => ({
    type: "PAGE_DATA",
    key: "index",
    payload
});

export const pageIndex = token => {
    return dispatch => {
        axios.post(`${api.PAGE_INDEX_CONFIG}`, { token }).then(res => {
            if (res.data.status === "1")
                dispatch(initPageIndexConfig(res.data.data));
        });
    };
};

const pageMemberIndexData = payload => ({
    type: "PAGE_DATA",
    key: "memberIndex",
    payload
});

export const pageMemberIndex = token => {
    return dispatch => {
        axios.post(`${api.PAGE_MEMBER_INDEX}`, { token }).then(res => {
            if (res.data.status === "1")
                dispatch(pageMemberIndexData(res.data.data));
        });
    };
};
