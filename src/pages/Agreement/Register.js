import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { withRouter } from "react-router-dom";
import { Icon } from "antd-mobile";
import * as api from "api";
import axios from "axios";
const pageTitle = "注册协议";

class Register extends PureComponent {
    state = { content: "" };
    componentDidMount() {
        this._fetchData();
        this._isMount = true;
    }
    _fetchData() {
        axios.get(`${api.ARTICLE_DETAIL}?id=31&model=2`).then(res => {
            if (res.data.status === "1" && this._isMount) {
                this.setState({
                    content: res.data.data.content
                });
            }
        });
    }
    componentWillUnmount() {
        this._isMount = false;
    }
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => {
                            window.history.back(-1);
                        }}
                    >
                        {pageTitle}
                    </NavBar>
                    <div
                        style={{
                            padding: "10px 15px",
                            background: "#fff"
                        }}
                        dangerouslySetInnerHTML={{
                            __html: this.state.content
                        }}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(Register);
