import React from "react";
import avatar from "images/avatar.png";
import styled from "styled-components";
const Avatar = ({telephone}) => {
    return (
        <StyledWrapper>
            <a href={`tel:${telephone}`}>
                <img src={avatar} alt="avatar" />
            </a>
        </StyledWrapper>
    );
};

export default Avatar;

const StyledWrapper = styled.div`
    width: 1.5733rem;
    text-align: center;
    a {
        margin: 0 auto;
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        background-color: #fff;
        border-radius: 50%;
        text-align: center;
        position: relative;
        img {
            width: 50%;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
`;
