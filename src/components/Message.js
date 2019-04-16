import React from "react";
import iconMail from "images/icon-mail.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types'

const Message = ({number,margin}) => {
    const StyledWrapper = styled.div`
        position: relative;
        width: 1rem;
        margin: ${props => props.margin ? props.margin : "0 10px"};
        a {
            display: block;
            position: relative;
            margin: auto;
            img {
                width: 0.5867rem;
                height: 0.4667rem;
                position: relative;
                top: 0.19rem;
                left: 0.19rem;
            }
            .bage {
                position: absolute;
                right: 0;
                top: 0;
                display: block;
                background: #fff;
                color: #ff4500;
                padding: 0 3px;
                font-size: 12px;
                text-align: center;
                min-width: 0.3267rem;
                height: 0.4267rem;
                line-height: 0.4267rem;
                border-radius: 0.2133rem;
                z-index: 1;
            }
        }
    `;
    return (
        <StyledWrapper margin={margin}>
            <Link to="/member/message/index">
                {number > 0 ? <span className="bage">{number}</span> : null}
                <img src={iconMail} alt="message" />
            </Link>
        </StyledWrapper>
    );
};

export default Message;

Message.propTypes ={
    number: PropTypes.number
}