import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import Delivery from "./Delivery/";
import Index from "./Index/";
import Entrust from "./Entrust/";
import Deal from "./Deal/";

const Query = () => {
    return (
        <Fragment>
            <Route path="/trade/account/query/index" component={Index} />
            <Route path="/trade/account/query/delivery" component={Delivery} />
            <Route path="/trade/account/query/entrust" component={Entrust} />
            <Route path="/trade/account/query/deal" component={Deal} />
         </Fragment>
    );
};

export default withRouter(Query);
