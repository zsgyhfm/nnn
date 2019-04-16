import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import { site } from "api";
const pageTitle = "操盘协议"; 

class Caopan extends PureComponent {
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => window.history.back(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <iframe
                        title={pageTitle}
                        width="100%"
                        height="100%"
                        src={`${site}/stock/index/protocol.html`}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default Caopan;
