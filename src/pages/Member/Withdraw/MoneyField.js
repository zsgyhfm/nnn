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
const FieldWrapper = styled.div`
    position: relative;
`;
const QuickBtn = styled.div`
    color: #459df5;
    font-size: 14px;
    position: absolute;
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    right: 0;
    top: 0;
    z-index: 1;
`;
class MoneyField extends PureComponent {
    render() {
        const { maxMoney } = this.props;
        return (
            <FormFieldGroup title="请输入保证金金额">
                <FieldWrapper>
                    <Input
                        type="number"
                        ref={x => {
                            this.moneyRef = x;
                        }}
                        placeholder={`可提金额 ${maxMoney} 元`}
                    />
                    <QuickBtn
                        onClick={() => {
                            this.moneyRef.value = maxMoney;
                        }}
                    >
                        全部提现
                    </QuickBtn>
                </FieldWrapper>
            </FormFieldGroup>
        );
    }
}
export default MoneyField;
