import React, {Fragment, PureComponent} from "react";
import DocumentTitle from "react-document-title";
import Header from "./Header/";
import Banner from "./Banner";
import QuickLink from "./QuickLink";
import Trial from "./Trial";
import Products from "./Products";
import Footer from "components/Footer/";
import PageContainer from "components/PageContainer";
import throttle from "lodash/throttle";
import getBanner from "actions/banner";
import {connect} from "react-redux";
import {pageIndex} from "actions/pages";

import Pop from "components/Prop"

class Index extends PureComponent {

    constructor() {
        super();
    }

    componentDidMount() {

        const {dispatch, banner, page, token} = this.props;

        if (!banner.length) {
            dispatch(getBanner())
        } // get banner when first loaded
        if (!page.loaded) {
            dispatch(pageIndex(token))
        }
        this.initHeader();

    }

    initHeader = () => {
        const headerMask = document.getElementById("j-index-header");
        let bannerHeight = 220;
        let headerFadeInHeight = bannerHeight - 50;
        if (headerMask) {
            this.setHeaderBackGround(headerMask, headerFadeInHeight);
            window.addEventListener(
                "scroll",
                throttle(() => {
                    this.setHeaderBackGround(headerMask, headerFadeInHeight);
                }, 100)
            );
        }
    };
    setHeaderBackGround = (headerMask, headerFadeInHeight) => {
        let scrollTop =
            window.scrollY ||
            window.pageYOffset ||
            document.body.scrollTop +
            ((document.documentElement &&
                document.documentElement.scrollTop) ||
                0);
        let opacity = Math.min(1, scrollTop / headerFadeInHeight);
        headerMask.style.backgroundColor = "rgba(255, 69, 0, " + opacity + " )";
    };

    handlePop(e) {
        //点击隐藏 首页广告 下次加载也不会再弹出 除了刷新
        const {dispatch} = this.props;
        dispatch(e)
    }

    render() {
        const {banner, page, pop} = this.props;
        console.log("pop=", pop)
        return (
            <DocumentTitle title="首页">

                <Fragment>
                    <Footer/>
                    <Pop click={this.handlePop.bind(this,{type:"DIS_SHOW_HOME"})} show={pop}/>
                    <PageContainer>
                        <Header msgNumber={page.msg_num} telephone={page.kfphone}/>
                        <Banner items={banner}/>
                        <QuickLink/>
                        <Trial trailMoney={page.money || "--"} duration={page.duration} deposit={page.deposit}/>
                        <Products rebate={page.DivideInto || "--"}/>
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state =>{
    return ({
        token: state.token,
        banner: state.banner,
        page: state.pages.index || {},
        pop: state.pop.home
    })
};

export default connect(mapStateToProps)(Index);
