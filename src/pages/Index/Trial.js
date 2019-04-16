import React from "react";
import styled from "styled-components";
import bgTiyan from "../../images/tiyan.jpg";
import ArrowRight from "components/ArrowRight";
import { Link } from "react-router-dom";
const StyleWrapper = styled.div`
    margin-bottom: 0.2667rem;
    background-color: #fff;
    padding: 6px 15px 0;
    overflow: hidden;
    .trial-hd {
        height: 0.9333rem;
        line-height: 0.9333rem;
    }

    .trial-hd a {
        display: block;
        color: #252525;
        font-size: 0.4267rem;
    }

    .trial-bd {
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px 15px;
        margin: 3px 0 10px;
        background: url(${bgTiyan}) no-repeat 85% center;
        background-size: auto 100%;
    }

    .trial-bd .title {
        font-size: 0.4267rem;
        font-weight: 700;
        color: #252525;
    }

    .trial-bd .title span {
        color: #ff4500;
    }
    .trial-bd p {
        color: #999;
    }
`;

const TrialHdArrow = styled(ArrowRight)`
    float: right;
    line-height: inherit;
    position: relative;
    top: 10px;
`;

const Trial = ({trailMoney, deposit,duration}) => {
    return (
        <StyleWrapper>
            <div className="trial-hd">
                <Link to="/trial">
                    免费体验 <TrialHdArrow />
                </Link>
            </div>
            <div className="trial-bd">
                <Link to="/trial">
                    <div className="title">
                        操盘体验资金
                        <span className="warn">{trailMoney}元</span>
                    </div>
                    <p>{deposit}元开启丨交易{duration}天丨完全免费</p>
                </Link>
            </div>
        </StyleWrapper>
    );
};

export default Trial;
