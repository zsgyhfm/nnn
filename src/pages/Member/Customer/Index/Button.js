import styled from "styled-components";
import { Link } from "react-router-dom";
export const Button = styled.div`
    display: block;
    text-align: center;
    width: 70%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 40px;
    color: ${props => (props.type === "primary" ? "#fff" : "#FF4500")};
    background-color: ${props =>
        props.type === "primary" ? "#FF4500" : "#fff"};
    border: 1px solid #ff4500;
    border-radius: 20px;
`;

export const ButtonLink = styled(Link)`
    display: block;
    text-align: center;
    width: 70%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 40px;
    color: ${props => (props.type === "primary" ? "#fff" : "#FF4500")};
    background-color: ${props =>
        props.type === "primary" ? "#FF4500" : "#fff"};
    border: 1px solid #ff4500;
    border-radius: 20px;
`;
