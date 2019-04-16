import refresh from "images/refresh.png";
import styled from "styled-components";

const Refresh = styled.div`
    width: 22px;
    height: 22px;
    background: url(${refresh}) center center no-repeat;
    background-size: 100%;
    animation: ${props =>
        props.loading ? "rotate360 2s linear infinite" : ""};
`;
export default Refresh;
