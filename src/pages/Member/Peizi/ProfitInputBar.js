import React from "react";
import styled from "styled-components";

const InputBarWrapper = styled.div`
    position: relative;
    input {
        border: none;
        font-size: 18px;
        line-height: calc(1.1467rem - 6px);
        padding: 0 10px;
        width: 80%;
    }
    span {
        position: absolute;
        z-index: 1;
        right: 10px;
        color: #459df5;
        line-height: 1.1467rem;
    }
`;
const ProfitInputBar = ({
    maxMoney,
    placeholder,
    value,
    onChangeMoney,
    getAll,
    validateMoney
}) => {
    return (
        <InputBarWrapper>
            <input
                type="number"
                name="money"
                placeholder={placeholder}
                onBlur={validateMoney}
                onChange={onChangeMoney}
                value={value}
            />
            <span onClick={() => getAll(maxMoney)}>全部提现</span>
        </InputBarWrapper>
    );
};

export default ProfitInputBar;
