import React, { Fragment, PureComponent } from "react";
import PrivateRoute from "components/Routes/PrivateRoute";
import { Route, withRouter } from "react-router-dom";
import Index from "./Index/index";
import Telephone from "./Telephone/";
import Password from "./Password/";
import PayPass from "./PayPass/";
import NewPhone from "./Telephone/newphone";
import Bank from "./Bank/index";
import BankAdd from "./Bank/BankAdd";
import BankEdit from "./Bank/BankEdit";
import RealName from "./RealName/";
class Profile extends PureComponent {
    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Route path={`${match.path}/index`} component={Index} />
                <PrivateRoute path={`${match.path}/telephone`} component={Telephone} />
                <PrivateRoute path={`${match.path}/newphone`} component={NewPhone} />
                <PrivateRoute path={`${match.path}/password`} component={Password} />
                <PrivateRoute path={`${match.path}/paypass`} component={PayPass} />
                <PrivateRoute path={`${match.path}/realname`} component={RealName} />
                <PrivateRoute path={`${match.path}/bank/index`} component={Bank} />
                <PrivateRoute path={`${match.path}/bank/add`} component={BankAdd} />
                <PrivateRoute path={`${match.path}/bank/edit/:id`} component={BankEdit} />
            </Fragment>
        );
    }
}
export default withRouter(Profile);
