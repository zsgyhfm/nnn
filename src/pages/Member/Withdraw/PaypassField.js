import React, { PureComponent } from "react";
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

class PaypassField extends PureComponent {
    render() {
        return (
            <FormFieldGroup title="请输入支付密码">
                <Input
                    type="password"
                    ref={x => (this.passRef = x)}
                    placeholder="请输入您的支付密码"
                />
            </FormFieldGroup>
        );
    }
}
export default PaypassField;
