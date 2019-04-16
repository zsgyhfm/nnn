import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";
import {PageTitle, Page, Header} from './styles'
import headerImg from 'images/zhuce@2x.png'
import RegisterForm from './RegisterForm'
const pageTitle = "注册交易平台";
class InviteReg extends Component {
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Page>
                    <PageTitle>{pageTitle}</PageTitle>
                    <Header><img src={headerImg} alt="注册推广"/></Header>
                    <RegisterForm>

                    </RegisterForm>
                </Page>
            </DocumentTitle>
        );
    }
}

export default withRouter(InviteReg);
