import React from "react";
import FormFieldGroup from "components/FormFieldGroup";
import RatioItem from "./RatioItem";
import styled from "styled-components";
const RatioList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const RatioSelect = ({ rate, money, onSelect, activeMultiple, readOnly }) => {
    return (
        <FormFieldGroup title={readOnly ? "配资金额" : "请选择配资金额"}>
            <RatioList>
                {rate.map(item => (
                    <RatioItem
                        key={item}
                        active={item === activeMultiple}
                        ratio={item}
                        money={money}
                        onSelect={onSelect}
                    />
                ))}
            </RatioList>
        </FormFieldGroup>
    );
};

export default RatioSelect;
