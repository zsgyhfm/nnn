import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import PageContainer from "components/PageContainer";
import { List, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
import MemberHeader from "./MemberHeader";
import Footer from "components/Footer";
import { pageMemberIndex } from "actions/pages";
import imgProfile from "images/zhzl@2x.png";
import imgGear from "images/pzgl@2x.png";
import imgMoney from "images/zjmx@2x.png";
import imgWifi from "images/tgzq@2x.png";
import imgGroup from "images/gywm@2x.png";
import imgBook from "images/bzzx@2x.png";
import imgMobile from "images/mobile.png";
import iconqq from "images/imgKefu.png";

const Item = List.Item;

class Index extends PureComponent {
    componentDidMount() {
        const { isLogin, fetchPageData, token } = this.props;
        if (isLogin) {
            fetchPageData(token);
        }
    }
    render() {
        const { isLogin, pageData, history } = this.props;
        let isAgent = false;
        if (pageData.info && (pageData.info.agent_id === 1 || pageData.info.agent_id === 2)) {
            isAgent = true;
        }
        return (
            <DocumentTitle title="会员中心">
                <Fragment>
                    <Footer />
                    <PageContainer>
                        <MemberHeader isLogin={isLogin} memberData={pageData} />
                        <WhiteSpace />
                        <List>
                            <Item
                                thumb={imgProfile}
                                arrow="horizontal"
                                onClick={() => {
                                    history.push("/member/profile/index");
                                }}
                            >
                                账户资料
                            </Item>
                            <Item
                                thumb={imgGear}
                                arrow="horizontal"
                                onClick={() => {
                                    history.push("/member/peizi/list/index");
                                }}
                            >
                                配资管理
                            </Item>
                            <Item
                                thumb={imgMoney}
                                arrow="horizontal"
                                onClick={() => {
                                    history.push("/member/moneylog/index");
                                }}
                            >
                                资金明细
                            </Item>
                            <Item
                                thumb={imgWifi}
                                arrow="horizontal"
                                extra={
                                    <div style={{ fontSize: "13px" }}>
                                        已推广{" "}
                                        <span style={{ color: "#252525" }}>
                                            {pageData.info
                                                ? pageData.info.link_m
                                                : 0}{" "}
                                            人
                                        </span>
                                    </div>
                                }
                                onClick={() => {
                                    isAgent ? history.push("/member/agent/index/users") :history.push("/member/customer/index")  ;
                                }}
                            >
                                推广赚钱
                            </Item>
                        </List>
                        <WhiteSpace />
                        <List>
                            <Item
                                thumb={imgBook}
                                arrow="horizontal"
                                onClick={() => {
                                    history.push({
                                        pathname: "/news/9",
                                        state: {
                                            title: "帮助中心"
                                        }
                                    });
                                }}
                            >
                                帮助中心
                            </Item>
                            <Item
                                thumb={imgGroup}
                                arrow="horizontal"
                                onClick={() => {
                                    history.push({
                                        pathname: "/news/8",
                                        state: {
                                            title: "关于我们"
                                        }
                                    });
                                }}
                            >
                                关于我们
                            </Item>
                            <Item
                                thumb={imgMobile}
                                arrow="horizontal"
                                onClick={() => {
                                    history.push("/download");
                                }}
                            >
                                App下载
                            </Item>
                            <a href="https://chat6.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1009480&configID=59275&jid=1330548362&s=1">
                            <Item
                                thumb={iconqq}
                                arrow="horizontal"
                               
                            >
                                客服
                            </Item>
                            </a>

                        </List>
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    isLogin: state.isLogin,
    token: state.token,
    pageData: state.pages.memberIndex || {}
});

const mapDispatchToProps = dispatch => ({
    fetchPageData: token => dispatch(pageMemberIndex(token))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Index)
);
