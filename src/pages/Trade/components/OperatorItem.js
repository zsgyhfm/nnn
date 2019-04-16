import styled from "styled-components";
const OperatorItem = styled.div`
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    display: flex;
    .hd {
        width: 1.8rem;
        text-align: center;
        line-height: 1.1333rem;
        font-size: 16px;
        color: #252525;
        border-right: 1px solid #e8e8e8;
    }
    .bd {
        flex: 1;
        padding: 7px 10px;
    }
    .input-group {
        display: flex;
        .button {
            width: 0.7467rem;
            height: 0.7467rem;
            line-height: 0.7467rem;
            text-align: center;
            font-size: 20px;
            color: #fff;
            margin: 0 10px;
            border-radius: 5px;
            &.increase {
                background-color: #05aa3b;
            }
            &.decrease {
                background-color: #ff4500;
            }
            &.disabled {
                background-color: #ddd;
            }
        }
        input {
            flex: 1;
            text-align: center;
            background-color: #f4f5f6;
            color: #252525;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            line-height: calc(0.7467rem - 2px);
            &::placeholder {
                color: #8e8e93;
            }
        }
    }
`;
export default OperatorItem;
