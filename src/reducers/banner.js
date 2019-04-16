import {INIT_BANNER} from "actions/action-type";

const banner = (state = [], action) => {
    if (action.type === INIT_BANNER){
        return action.payload;
    }
    return state;
};

export default banner;
