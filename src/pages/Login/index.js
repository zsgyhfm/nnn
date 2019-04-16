import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import LoginForm from "./LoginForm";
import DocumentTitle from "react-document-title";
import Slogan from "components/Sign/Slogan";
import FormContainer from "components/Sign/FormContainer";

const pageTitle = "登录";

class Login extends Component {
    render() {
        const { isLogin } = this.props;
        if (isLogin) return <Redirect to="/member/index" />;
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => window.history.back(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <FormContainer>
                        <Slogan />
                        <LoginForm />
                    </FormContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.isLogin
});

export default withRouter(connect(mapStateToProps)(Login));
