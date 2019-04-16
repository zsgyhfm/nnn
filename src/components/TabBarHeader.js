import styled from "styled-components";
const TabBarHeader = styled.div`
    position: relative;
    overflow: hidden;
    padding-bottom: 5px;
    &::before {
        content: "";
        width: 100%;
        height: 50%;
        background-color: #ff4500;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
`;

export default TabBarHeader;
