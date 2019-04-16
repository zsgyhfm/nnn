const stockIndex = (state = [], action) => {
    switch (action.type) {
        case "STOCK_INDEX":
            return action.payload;
        default:
            return state;
    }
};

export default stockIndex;
