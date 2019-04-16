import React from "react";
import { connect } from "react-redux";
import { Popover } from "antd-mobile";
import CurrentSubAccount from "./CurrentSubAccount";
import { changeSubAccount } from "actions/subaccount";

const Item = Popover.Item;

let visible = false;

const onSelectAccount = (item, dispatch) => {
    visible = false;
    dispatch(changeSubAccount(item));
};

const SubAccount = ({ subAccounts, subAccount, dispatch }) => {
    if(subAccounts.length === 0){
        return <CurrentSubAccount />
    }
    const items = subAccounts.map(item => (
        <Item value={item} disabled={item.sub_account === subAccount.accountInfo.sub_account? true : false} >{item.sub_account}</Item>
    ));
    return (
        <Popover
            mask
            overlayClassName="fortest"
            overlayStyle={{ color: "currentColor" }}
            visible={visible}
            overlay={items}
            align={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [10, 16] }}
            onSelect={opt => onSelectAccount(opt.props.value, dispatch)}
        >
            <div>
                <CurrentSubAccount
                    account={subAccount.accountInfo.sub_account}
                />
            </div>
        </Popover>
    );
};

const mstp = state => ({
    subAccount: state.subAccount,
    subAccounts: state.subAccounts
});

export default connect(mstp)(SubAccount);
