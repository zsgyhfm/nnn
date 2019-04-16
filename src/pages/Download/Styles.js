import styled from "styled-components";
import bonus from "images/download/bonus.png";
export const Page = styled.div`
    min-height: 100%;
    background-color: #ff4500;
    background-image: linear-gradient(to bottom, #ff4500, #ff6f41);
`;

export const Wrapper = styled.div`
    background: url(${bonus}) no-repeat;
`;

export const Button = styled.a`
    display: block;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;
    color: #ffffff;
    margin-bottom: 20px;
    background: ${props =>
        props.type === "primary" ? "#FBC02D" : "transparent"};
    box-shadow: ${props =>
        props.type === "primary" ? " 0 4px 0 #db2b13" : "none"};
    color: ${props => (props.type === "primary" ? "#db2b13" : "#fff")};
    border: ${props => (props.type === "primary" ? "none" : "1px solid #fff")};
`;

export const ButtonGroup = styled.div`
    padding: 10px 15px;
`;

export const Kids = styled.div`
    text-align: center;
    img {
        max-width: 60%;
    }
`;
