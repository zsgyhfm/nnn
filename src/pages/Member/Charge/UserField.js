import React, { Component } from "react";
import FormFieldGroup from "components/FormFieldGroup";

import styled from "styled-components";

const Input = styled.input`
    font-size: 16px;
    color: #252525;
    padding: 5px 8px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
    &::-webkit-input-placeholder {
        color: #c7c7c7;
    }
`;

class UserField extends Component {
    render() {
        return (
            <FormFieldGroup title="请输入转账用户名">
                <Input
                    type="text"
                    ref={el => (this.info = el)}
                    placeholder="请输入此次的转账用户名"
                />
            </FormFieldGroup>
        );
    }
}
export default UserField;
