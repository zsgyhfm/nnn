import axios from "axios";
import * as api from "../api";
import { INIT_BANNER } from "actions/action-type";
const getBanner = () => {

    return dispatch => {

       return  axios.get(`${api.GET_BANNER}?equipment=1`).then(res => {
            if (res.data.status === "1") {
                dispatch(initBanner(res.data.data || []))
            };
        });
    };
};

export default getBanner;

const initBanner = banners => {
    return {
        type: INIT_BANNER,
        payload: banners
    };
};
