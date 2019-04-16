import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "components/Routes/PrivateRoute";
import Index from "./Index/";
import Position from "./Position/";
import Cancel from "./Cancel/";
import Query from "./Query/";

const Account = () => {
    return (
        <Fragment>
            <Route path="/trade/account/index" component={Index} />
            <PrivateRoute path="/trade/account/position" component={Position} />
            <PrivateRoute path="/trade/account/query" component={Query} />
            <PrivateRoute path="/trade/account/cancel" component={Cancel} />
        </Fragment>
    );
};

export default Account;
