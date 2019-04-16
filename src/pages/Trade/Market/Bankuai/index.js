import React, { Fragment } from "react";
import axios from "axios";
import * as api from "api";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import NavBarSearch from "components/NavBarSearch";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";
import round from "lodash/round";
const pageTitle = "板块列表";
class Bankuai extends React.PureComponent {
    state = {
        lists: []
    };
    componentDidMount() {
        this._isMount = true;
        this.fetchData();
    }
    fetchData = () => {
        axios.get(`${api.MARKET_SECTION}`).then(res => {
            if (this._isMount && res.data.status === 1) {
                this.setState({
                    lists: res.data.data.sort((a, b) => {
                        if (a[5] === b[5]) return 0;
                        return parseFloat(a[5]) > parseFloat(b[5]) ? -1 : 1;
                    })
                });
            }
        });
    };
    componentWillUnmount = () => {
        this._isMount = false;
    };

    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => window.history.back(-1)}
                        right={
                            <NavBarSearch to="/trade/search">
                                <Icon type="search" />
                            </NavBarSearch>
                        }
                    >
                        {pageTitle}
                    </NavBar>
                    <StyleWrapper>
                        {this.state.lists.map(item => (
                            <Item
                                title={item[1]}
                                key={item[0]}
                                code={item[0]}
                                name={item[1]}
                                stock={{ name: item[12], code: item[8] }}
                                rate={round(item[5], 2)}
                            />
                        ))}
                    </StyleWrapper>
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(Bankuai);

const StyleWrapper = styled.div`
    background-color: #fff;
    overflow: hidden;
`;
