import styled from "styled-components";

const UploadAvatar = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: ${props => (props.visible ? "block" : "none")};
    .wrapper {
        width: 80%;
        margin: auto;
        background-color: #fff;
        padding: 20px;
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
    }
`;

export default UploadAvatar;
