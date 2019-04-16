import React, { Fragment } from "react";
import { withRouter, Route } from "react-router-dom";
import Freeze from './Freeze';
import Default from './Default';
import Charge from './Charge';
import Promotion from './Promotion';
import Withdraw from './Withdraw';
import Calc from './Calc';


const MoneyLog = () => {
    return(
        <Fragment>
            <Route path="/member/moneylog/freeze" component={Freeze} />
            <Route path="/member/moneylog/charge" component={Charge} />
            <Route path="/member/moneylog/withdraw" component={Withdraw} />
            <Route path="/member/moneylog/calc" component={Calc} />
            <Route path="/member/moneylog/promotion" component={Promotion} />
            <Route path="/member/moneylog/index" component={Default} />
        </Fragment>
    )
}
export default withRouter(MoneyLog)