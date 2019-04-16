import React from "react";
import styled from "styled-components";
import { Picker } from "antd-mobile";
import down from "images/down.png";

const RenewalDurationWrapper = styled.div`
    font-size: 18px;
    text-align: center;
    line-height: 1.1467rem;
    height: 100%;
    position: relative;
    &:after {
        content: " ";
        width: 12px;
        height: 7px;
        position: absolute;
        display: block;
        top: 50%;
        right: 40px;
        margin-top: -3px;
        background: url(${down}) center center no-repeat;
        background-size: 100%;
    }
`;

const RenewalDuration = ({
    suffix,
    items,
    activeItem,
    onSelectItem,
    placeholder,
    children
}) => {
    return (
        <Picker data={items} cols={1} onChange={item => onSelectItem(item)}>
            <RenewalDurationWrapper>
                {activeItem ? activeItem + suffix : placeholder}
            </RenewalDurationWrapper>
        </Picker>
    );
};

export default RenewalDuration;
