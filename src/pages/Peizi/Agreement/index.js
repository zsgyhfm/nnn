import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import NavBar from "components/NavBar";
import { withRouter } from "react-router-dom";
import * as api from "api";
import axios from "axios";
import { connect } from "react-redux";
const pageTitle = "操盘协议";

class Agreement extends PureComponent {
    state = {
        agreement: ""
    };
    componentDidMount = () => {
        const { token, match } = this.props;
        // console.log(match)
        this._fetchData(match.params.id, token);
    };

    _fetchData(id, token) {
        axios.post(`${api.PEIZI_CONTRACT}`, { id, token }).then(res => {
            this.setState({
                agreement: res.data.data
            });
        });
    }
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Icon
                                type="left"
                                style={{ width: "30px", height: "30px" }}
                            />
                        }
                        onLeftClick={() => window.history.go(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <div
                        style={{ background: "#fff", padding: "10px 15px" }}
                        dangerouslySetInnerHTML={{
                            __html: this.state.agreement
                        }}
                    />
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Agreement));
