import { LOGOUT_SUCCESS } from "actions/action-type";

const selection = (stocks = [], action) => {
    switch (action.type) {
        case "ADD_SELECTION": //单个加入
            return [...stocks, action.payload.stock];

        case "DELETE_SELECTION": // 删除
            return stocks.filter(item => {
                return item.code !== action.payload.code;
            });
        case "INIT_SELECTION": 
            return action.payload.selections
        case LOGOUT_SUCCESS : 
            return [];
        default:
            return stocks;
    }
};

export default selection