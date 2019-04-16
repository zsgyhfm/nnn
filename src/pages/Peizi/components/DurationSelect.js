import React from "react";
import FormFieldGroup from "components/FormFieldGroup";
import { Icon, Picker } from "antd-mobile";
import styled from "styled-components";

const Button = styled.button`
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    border: 1px solid #e8e8e8;
    padding: 5px 8px;
    text-align: center;
    line-height: 30px;
    width: 100%;
    line-height: 30px;
    font-size: 16px;
    color: #5a5a62;
`;

const DurationSelect = ({
    title,
    placeholder,
    items,
    activeItem,
    suffix,
    readOnly,
    onSelectItem
}) => {
    return (
        <FormFieldGroup title={title}>
            <Picker data={items} cols={1} onChange={item => onSelectItem(item)} disabled={readOnly}>
                <Button>
                    {activeItem ? activeItem + suffix : placeholder}{" "}
                    {readOnly ? null : <Icon type="down" size="xxs" />}
                </Button>
            </Picker>
        </FormFieldGroup>
    );
};
export default DurationSelect;
