import React from "react";

const CurrentSubAccount = ({ account }) => {
    return (
        <div className="current-subaccount">
            {account ? account : "无交易账户"} &nbsp;&nbsp;<i className="iconfont">&#xe601;</i>
        </div>
    );
};

export default CurrentSubAccount;
