import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkButton = styled(Link)`
    display: inline-block;
    width: 75px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #459df5;
    border: 1px solid #459df5;
    border-radius: 4px;
    background: transparent;
`;
export default LinkButton;
