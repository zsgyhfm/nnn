import React, { Fragment } from "react";
import Day from "./Day/";
import Week from "./Week/";
import Month from "./Month/";
import Confirm from "./Confirm/";
import Agreement from "./Agreement/";
import Free from "./Free/index";
import { Route, withRouter } from "react-router-dom";

const Peizi = ({ match }) => {
    return (
        <Fragment>
            <Route path={`${match.path}/day`} component={Day} />
            <Route path={`${match.path}/week`} component={Week} />
            <Route path={`${match.path}/month`} component={Month} />
            <Route path={`${match.path}/free`} component={Free} />
            <Route path={`${match.path}/confirm`} component={Confirm} />
            <Route path={`${match.path}/agreement/:id`} component={Agreement} />
        </Fragment>
    );
};

export default withRouter(Peizi);
