import React from "react";
import { Picker } from "antd-mobile";

const SinglePicker = ({ selected, options, onSelectItem, children }) => {
    const selectedItem = options.find(item => item.value === selected);
    return (
        <Picker
            extra={selected && selectedItem ? selectedItem.label : "请选择"}
            cols={1}
            data={options}
            onChange={item => onSelectItem(item)}
        >
            {children}
        </Picker>
    );
};

export default SinglePicker;

