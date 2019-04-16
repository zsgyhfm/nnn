import React from "react";
import styled from "styled-components";

const List = styled.div`
    margin: 0 0 15px;
    padding-left: 15px;
    background-color: #fff;
`;

const ItemStyle = styled.div`
    position: relative;
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;

    :not(:last-child)::after {
        content: " ";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        transform: scale(1, 0.5);
        background-color: #e8e8e8;
    }
    > .title {
        font-size: 16px;
        flex: 1;
        color: #252525;
        @media (max-width: 330px){
            font-size: 14px;
        }
    }
    > .bd {
        flex-basis: 65%;
        color: #8e8e93;
    }
`;

List.Item = ({ title, onLeftClick, align, flexBasis, children }) => {
    return (
        <ItemStyle>
            <div className="title" onClick={onLeftClick}>
                {title}
            </div>
            <div className="bd" style={{ textAlign: align ? align : "", flexBasis: flexBasis ? `${flexBasis}` : '' }}>
                {children}
            </div>
        </ItemStyle>
    );
};

export default List;
