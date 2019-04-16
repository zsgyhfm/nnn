import React from "react";
import styled from "styled-components";
const ListHeader = ({ fields }) => {
    return (
        <StyleWrapper>
            {fields.map((item, index) => (
                <Item key={index} align={item.align}>
                    {item.label}
                </Item>
            ))}
        </StyleWrapper>
    );
};

export default ListHeader;

const StyleWrapper = styled.div`
    display: flex;
    background-color: #f3f7ff;
    color: #8e8e93;
    font-size: 12px;
    line-height: 30px;
    padding: 0 15px;
`;
const Item = styled.div`
    flex: 1;
    text-align: ${props => (props.align ? props.align : "center")};
`;
