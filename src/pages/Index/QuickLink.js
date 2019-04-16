import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import iconBook from '../../images/book.png'
import iconTrend from '../../images/trend.png'

const QuickLinkContainer = styled.div.attrs({
    className: "weui-flex"
})`
    background-color: #fff;
    margin-bottom: 0.2667rem;
    .quick-link__item {
        padding: 0.4267rem 20px;
        overflow: hidden;
        position: relative;
    }

    .quick-link__item:first-child::after {
        content: " ";
        position: absolute;
        display: block;
        width: 1px;
        height: 80%;
        background: #f3f6ff;
        right: 0;
        top: 10%;
        transform: scaleY(0.5);
    }

    .quick-link__item .figure {
        float: right;
        width: 1.3333rem;
        height: 1.3333rem;
    }

    .quick-link__item .figure img {
        width: 100%;
        height: 100%;
    }

    .quick-link__item-bd {
        overflow: hidden;
    }

    .quick-link__item-bd h3 {
        font-weight: 400;
        font-size: 0.4267rem;
        color: #252525;
    }
    .quick-link__item-bd p {
        color: #999999;
        font-size: 0.32rem;
    }
`;
const QuickLink = () => {
    return (
        <QuickLinkContainer>
            <div className="weui-flex__item quick-link__item">
                <Link to="/news/9">
                    <div className="figure">
                        <img src={iconBook} alt="icon" />
                    </div>
                    <div className="quick-link__item-bd">
                        <h3>新手帮助</h3>
                        <p>免费领体验金</p>
                    </div>
                </Link>
            </div>
            <div className="weui-flex__item quick-link__item">
                <Link to="/member/peizi/list/index">
                    <div className="figure">
                        <img src={iconTrend} alt="icon" />
                    </div>
                    <div className="quick-link__item-bd">
                        <h3>我的操盘</h3>
                        <p>低门槛提现快</p>
                    </div>
                </Link>
            </div>
        </QuickLinkContainer>
    );
};

export default QuickLink;
