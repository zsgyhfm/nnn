import React, { Fragment } from "react";
import { withRouter, Route } from "react-router-dom";
import PrivateRoute from "components/Routes/PrivateRoute";
import Peizi from "./Peizi/index";
import Profile from "./Profile/index";
import MoneyLog from "./MoneyLog/index";
import Detail from "./Peizi/Detail";
import Expend from "./Peizi/Expend";
import AddMoney from "./Peizi/AddMoney";
import Renewal from "./Peizi/Renewal";
import Profit from "./Peizi/Profit";
import Index from "./Index/";
import Message from "./Message/";
import Notice from "./Message/Notice";
import Withdraw from "./Withdraw/";
import Charge from "./Charge/";
import Agent from "./Agent/";
import Customer from "./Customer/";
import Agreement from "../Peizi/Agreement/";
import { default as MessageDetail } from "./Message/Detail";

const Member = ({ match }) => {
    console.log("Member",match)
    return (
        <Fragment>
            <Route path={`${match.url}/index`} component={Index} />
            <Route path={`${match.url}/profile`} component={Profile} />
            <PrivateRoute path={`${match.url}/peizi/list/:type`} component={Peizi} />
            <PrivateRoute path={`${match.url}/peizi/detail/:id`} component={Detail} />
            <PrivateRoute path={`${match.url}/peizi/agreement/:id`} component={Agreement} />
            <PrivateRoute path={`${match.url}/peizi/expend/:id`} component={Expend} />
            <PrivateRoute path={`${match.url}/peizi/addmoney/:id`} component={AddMoney} />
            <PrivateRoute path={`${match.url}/peizi/renewal/:id`} component={Renewal} />
            <PrivateRoute path={`${match.url}/peizi/profit/:id`} component={Profit} />
            <PrivateRoute path={`${match.url}/moneylog`} component={MoneyLog} />
            <PrivateRoute path={`${match.url}/message/index`} component={Message} />
            <PrivateRoute path={`${match.url}/message/notice`} component={Notice} />
            <PrivateRoute path={`${match.url}/withdraw`} component={Withdraw} />
            <PrivateRoute path={`${match.url}/agent`} component={Agent} />
            <PrivateRoute path={`${match.url}/customer`} component={Customer} />
            <PrivateRoute path={`${match.url}/charge`} component={Charge} />
            <PrivateRoute path={`${match.url}/message/detail/:id`} component={MessageDetail}
            />
        </Fragment>
    );
};

export default withRouter(Member);
// export default Member;
