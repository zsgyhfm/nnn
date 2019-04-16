import React from "react";
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

class MoneyInput extends React.PureComponent{
    state = {
        money: ""
    }
    render(){
        const { max, min, onChange } = this.props;
        return (
            <FormFieldGroup title="请输入保证金金额">
                <Input
                    type="number"
                    onKeyUp={() => {
                        onChange(this.money.value);
                    }}
                    placeholder={`保证金介于 ${min ? min : "0"} - ${
                        max ? max : "0"
                    } 元之间`}
                    ref={el => (this.money = el)}
                />
            </FormFieldGroup>
        );
    }

}

export default MoneyInput;
