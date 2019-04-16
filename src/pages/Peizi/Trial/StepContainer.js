import React from "react";
import { WingBlank, Button } from "antd-mobile";
import Step from "./Step";
import StyleWrapper from "./StyleWrapper";
import { Link } from "react-router-dom";

const StepContainer = ({ onSubmit,accountMoney,setting, isLogin,mobile }) => {
    return (
        <WingBlank>
            <StyleWrapper>
                <div className="top">每个新用户只有一次体验机会</div>
                <div className="lists">
                    {isLogin ? (
                        <Step idx={1}>欢迎您， {mobile}</Step>
                    ) : (
                        <Step idx={1}>
                            <Link to="/register">注册</Link> 首次注册并登录平台
                        </Step>
                    )}
                    {isLogin ? (
                        <Step idx={2}>
                            账户余额：<span className="text-warnning">
                                {accountMoney}
                            </span>{" "}
                            元，交<span className="text-warnning">
                                {setting[0]}
                            </span>元体验金
                        </Step>
                    ) : (
                        <Step idx={2}>
                            <Link to="/member/charge">充值</Link> 交 {setting[0]}元体验金
                        </Step>
                    )}

                    <Step idx={3}>
                        平台出资 <span className="text-warnning">  {setting[1]}</span>元，由您操盘，完全免费
                    </Step>
                    <Step idx={4}>
                        交易 <span className="text-warnning">  {setting[2]} </span> 天，最后一个交易日<span className="text-warnning"> {" "} 14:45{" "} </span>前卖出
                    </Step>
                    <Step idx={5}>
                        盈利 <span className="text-warnning"> 100% </span>全归您，超额亏损归我们
                    </Step>
                </div>

                <Button
                    type="warning"
                    style={{ backgroundColor: "#FF8E01" }}
                    onClick={() => {
                        onSubmit();
                    }}
                >
                    马上开启免费体验
                </Button>
            </StyleWrapper>
        </WingBlank>
    );
};

export default StepContainer;
