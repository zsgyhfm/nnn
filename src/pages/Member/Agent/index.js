import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PrivateRoute from "components/Routes/PrivateRoute";
import Index from "./Index/";
import User from "./User/";
import Invite from "./Invite/";

const Agent = () => {
    return (
        <Fragment>
            <PrivateRoute path="/member/agent/index" component={Index} />
            <PrivateRoute path="/member/agent/user/:id" component={User} />
            <PrivateRoute path="/member/agent/invite/:id" component={Invite} />
        </Fragment>
    );
};

export default withRouter(Agent);
