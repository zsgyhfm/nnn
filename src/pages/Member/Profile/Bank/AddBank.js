import styled from "styled-components";
import { Link } from "react-router-dom";

const AddBank = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8e8d92;
    padding: 10px 0;
    line-height: 20px;
    background-color: #fff;
    font-size: 14px;
    & > .am-icon-cross {
        transform: rotateZ(45deg)
    }
`;

export default AddBank;
