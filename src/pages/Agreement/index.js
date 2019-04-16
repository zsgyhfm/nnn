import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Register from './Register'
import Caopan from './Caopan'

const Agreement = () => {
    return (
        <Fragment>
            <Route path="/agreement/register" component={Register} />
            <Route path="/agreement/caopan" component={Caopan} />
        </Fragment>
    );
};

export default Agreement