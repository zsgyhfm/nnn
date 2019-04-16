import React from "react";
import FormFieldGroup from "components/FormFieldGroup";
import { Picker } from "antd-mobile";

const BankCardSelect = ({ items, activeItem, onSelectItem, children }) => {
    return (
        <FormFieldGroup title="请选择提现银行卡">
                <Picker
                    data={items}
                    cols={1}
                    onChange={item => onSelectItem(item)}
                >
                   {children}
                </Picker>
        </FormFieldGroup>
    );
};

export default BankCardSelect;
