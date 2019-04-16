import styled from "styled-components";

const TriangleDown = styled.span.attrs({
    className: "triangle"
})`
    position: relative;
    display: inline-block;
    width: 6px;
    height: 6px;
    &::before {
        content: " ";
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #8e8e93;
        position: absolute;
        top: -2px;
        left: 0;
    }
`;

export default TriangleDown;
