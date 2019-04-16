import React from "react";
import { Route, Switch } from "react-router-dom";
import Selection from "./Selection/";
import Market from "./Market/";
import Search from "./Search/";
import Account from "./Account/";
import Stock from "./Stock/";
import MarketList from "./Market/List/";
import RaiseList from "./Market/Raise/";
import Bankuai from "./Market/Bankuai/";
import BankuaiDetail from "./Market/Bankuai/Detail";
import { connect } from "react-redux";
import PrivateRoute from "components/Routes/PrivateRoute";
import Buy from "./Buy/";
import Sell from "./Sell/";

class Trade extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path="/trade/selection" component={Selection} />
                <Route path="/trade/market/index" component={Market} />
                <Route
                    path="/trade/market/list"
                    component={MarketList}
                />
                <Route
                    path="/trade/market/raise"
                    component={RaiseList}
                />
                <Route
                    path="/trade/market/decline"
                    component={RaiseList}
                />
                <Route
                    path="/trade/market/bankuai"
                    exact
                    component={Bankuai}
                />
                <Route
                    path="/trade/market/bankuai/:code"
                    exact
                    component={BankuaiDetail}
                />
                <Route path="/trade/search" component={Search} />
                <Route path="/trade/account" component={Account} />
                <Route path="/trade/stock/:code" component={Stock} />
                <PrivateRoute path="/trade/buy/" exact component={Buy} />
                <PrivateRoute path="/trade/buy/:code" component={Buy} />
                <PrivateRoute path="/trade/sell/" exact component={Sell} />
                <PrivateRoute path="/trade/sell/:code" component={Sell} />
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    subAccount: state.subAccount
});

export default connect(mapStateToProps)(Trade);
