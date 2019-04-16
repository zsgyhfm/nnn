import React, { Fragment, PureComponent } from "react";
import DocumentTitle from "react-document-title";
import { NavBar, Icon } from "antd-mobile";
import Slogan from "components/Sign/Slogan";
import FormContainer from "components/Sign/FormContainer";
import RegisterForm from "./RegisterForm";
import { withRouter } from "react-router-dom";
const pageTitle = "注册账户";

class Register extends PureComponent {
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        icon={<Icon style={{ color: "#fff" }} type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >
                        {pageTitle}
                    </NavBar>

                    <FormContainer>
                        <Slogan />
                        <RegisterForm />
                    </FormContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(Register);
