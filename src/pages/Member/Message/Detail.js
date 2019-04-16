import React, { Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import NavBar from "components/NavBar";
import Article from "components/Article";

const pageTitle = "消息详情";

const Detail = () => {
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
                <Article
                    title="五一劳动节放假通知"
                    date="2019-03-21 23:10:23"
                >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi itaque laudantium nobis eum, nam et explicabo
                    aperiam earum ad veritatis, quisquam expedita, commodi
                    maiores. Vitae officiis reiciendis cupiditate harum vel!
                </Article>
            </Fragment>
        </DocumentTitle>
    );
};

export default Detail;
