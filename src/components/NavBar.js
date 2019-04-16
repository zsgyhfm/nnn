import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    height: 45px;
    line-height: 45px;
    background-color: ${props =>
        props.background ? props.background : "#ff4500"};
    color: #fff;
    & > div {
        flex: 1;
    }
    > .navbar-left {
        display: flex;
        align-items: center;
        padding-left: 10px;
        a {
            color: #fff;
            display: flex;
            align-items: center;
        }
    }
    > .navbar-title {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        font-size: 18px;
        justify-content: center;
        white-space: nowrap;
    }
    > .navbar-right {
        display: flex;
        padding-right: 15px;
        align-items: center;
        justify-content: flex-end;
    }
`;

const NavBar = ({ left, onLeftClick, children, right, background }) => {
    return (
        <StyleWrapper background={background}>
            <div className="navbar-left" onClick={onLeftClick}>
                {left}
            </div>
            <div className="navbar-title">{children}</div>
            <div className="navbar-right">{right}</div>
        </StyleWrapper>
    );
};

export default NavBar;
