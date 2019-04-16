import React, { Fragment } from "react";
import { List, Icon, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import styled from "styled-components";
import TradeNav from "../../components/TradeNav";
import AccountTitle from "../../components/AccountTitle";
const pageTitle = "查询";
const Item = styled(List.Item)`
    a {
        display: block;
        color: #252525;
    }
`;

const Index = () => {
    return (
        <DocumentTitle title={pageTitle}>
            <Fragment>
                <NavBar
                    left={
                        <Link to="/trade/account/index">
                            <Icon type="left" />
                        </Link>
                    }
                >
                    <AccountTitle />
                </NavBar>
                <TradeNav />
                <WhiteSpace />
                <List>
                    <Item arrow="horizontal">
                        <Link to="/trade/account/query/entrust">委托记录</Link>
                    </Item>
                    <Item arrow="horizontal">
                        <Link to="/trade/account/query/deal">成交记录</Link>
                    </Item>
                    <Item arrow="horizontal">
                        <Link to="/trade/account/query/delivery">交割查询</Link>
                    </Item>
                </List>
            </Fragment>
        </DocumentTitle>
    );
};

export default Index;
