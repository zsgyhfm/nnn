import React from "react";
import defaultAvatar from "images/avatar2.png";
import styled from "styled-components";
const StyleWrapper = styled.div`
    img {
        border-radius: 50%;
    }
`;
const Avatar = ({ image }) => {
    let avatar = image || defaultAvatar;
    return (
        <StyleWrapper>
            <img src={avatar} alt="avatar" />
        </StyleWrapper>
    );
};
export default Avatar;
