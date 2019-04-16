import React from "react";
import Item from "./Item";
import StyleWrapper from "./StyleWrapper";
import iconPie from "../../images/icon-pie.png";
import iconPieActive from "../../images/icon-pie-active.png";
import iconMan from "../../images/icon-man.png";
import iconManActive from "../../images/icon-man-active.png";
import iconqq from "../../images/icon-kefu.png";
import iconStar from "../../images/icon-star.png";
import iconStarActive from "../../images/icon-star-active.png";
import iconTrend from "../../images/icon-trend.png";
import iconTrendActive from "../../images/icon-trend-active.png";
import iconYen from "../../images/icon-yen.png";
import iconYenActive from "../../images/icon-yen-active.png";
const TodoComponent = {
    width: "22px",
    height: "22px"
};
const Footer = () => {
    return (
        <StyleWrapper>
            <Item
                to="/"
                figure={iconPie}
                figureActive={iconPieActive}
                title="首页"
            />
            <div className="weui-tabbar__item">
                <a
                    href="https://chat6.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1009480&configID=59275&jid=1330548362&s=1"
                    rel="noopener noreferrer"
                >
                    <img
                        src={iconqq}
                        alt="客服"
                        className="weui-tabbar__icon weui-tabbar__icon-1"
                        style={TodoComponent}
                    />
                    <p className="weui-tabbar__label">客服</p>
                </a>
            </div>
           
            <Item
                to="/trade/market/index"
                figure={iconTrend}
                figureActive={iconTrendActive}
                title="行情"
            />
            <Item
                to="/trade/account/index"
                figure={iconYen}
                figureActive={iconYenActive}
                title="交易"
            />
            <Item
                to="/member/index"
                figure={iconMan}
                figureActive={iconManActive}
                title="我的"
            />
        </StyleWrapper>
    );
};

export default Footer;
