import React from "react";
import TextPrimary from "components/Text/TextPrimary";
const AgentPromptMessage = ({ rate , newValue = 50}) => {
    return (
        <div>
            设置{newValue}%表示，您作为代理商获得下级用户的返佣为用户配资管理费的<TextPrimary
            >
                {rate * newValue / 100}%
            </TextPrimary>{" "}
            ({rate}% X {newValue}%)
        </div>
    );
};

export default AgentPromptMessage;
