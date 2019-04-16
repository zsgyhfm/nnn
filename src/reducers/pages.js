const pages = (state = {}, action) => {
    switch (action.type) {
        case "PAGE_DATA":
            return {
                ...state,
                [action.key]: { loaded: true, ...action.payload }
            };
        case "LOGOUT_SUCCESS": 
            return {
                ...state,
                memberIndex: {loaded: false}
            }
        default:
            return state;
    }
};

export default pages;
