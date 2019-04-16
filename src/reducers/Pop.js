import PopAction from "../actions/Pop"
let data = {
    home:true,
    service:false,
    market:false,
    trade:false,
    profile:false
}
const pop = (state = data, action) => {
    switch (action.type) {
        case PopAction.SHOW_HOME:
            return{
                ...state,home:true
            };
        case PopAction.DIS_SHOW_HOME:
            return {
                ...state,home:false
            };
        case PopAction.SHOW_SERVICE:
            return{
                ...state,service:true
            };
        case PopAction.DIS_SHOW_SERVICE:
            return {
                ...state,service:false
            };
        case PopAction.SHOW_MARKET:
            return{
                ...state,market:true
            };
        case PopAction.DIS_SHOW_MARKET:
            return {
                ...state,market:false
            };
        case PopAction.SHOW_TRADE:
            return{
                ...state,trade:true
            };
        case PopAction.DIS_SHOW_TRADE:
            return {
                ...state,trade:false
            };
        case PopAction.SHOW_PROFILE:
            return{
                ...state,profile:true
            };
        case PopAction.DIS_SHOW_PROFILE:
            return {
                ...state,profile:false
            };
        default:
            return state
    }
};
export default pop
