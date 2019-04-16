import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
const PrivateRoute = ({ component: Component, isLogin, redirectPath, ...rest }) => {

    return(

        <Route
            {...rest}
            render={props => isLogin ? (<Component {...props} />) : (
                    <Redirect
                        to={{
                            pathname: redirectPath || "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    isLogin: state.isLogin
});
export default withRouter(connect(mapStateToProps)(PrivateRoute));

