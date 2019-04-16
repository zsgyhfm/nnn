import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import NavBar from "components/NavBar";
import Header from "./Header";
import { Page, Wrapper, ButtonGroup, Button, Kids } from "./Styles";
import kids from "images/download/kids.png";
import axios from "axios";
import * as api from "api";

const pageTitle = "下载";

class Download extends Component {
    state = {
        andriod: "",
        iOS: ""
    };
    componentDidMount() {
        this._fetchData();
    }
    _fetchData = () => {
        axios.get(`${api.APP_DOWNLOAD}`).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    andriod: res.data.data.app_down_android,
                    iOS: res.data.data.down_ios
                });
            }
        });
    };
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Page>
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
                    <Wrapper>
                        <Header />
                        <ButtonGroup>
                            <Button type="primary" href={this.state.andriod} target="_blank">
                                下载安卓端
                            </Button>
                            <Button href={this.state.iOS}  target="_blank">下载苹果端</Button>
                        </ButtonGroup>
                        <Kids>
                            <img src={kids} alt="kids" />
                        </Kids>
                    </Wrapper>
                </Page>
            </DocumentTitle>
        );
    }
}

export default Download;
