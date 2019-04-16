import React from "react";
import { Checkbox } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyleWrapper = styled.div`
    font-size: 14px;
    .link {
        padding-left: 10px;
        color: #8e8e93;
    }
    a {
        color: #459df5;
    }

    .am-checkbox.am-checkbox-checked .am-checkbox-inner {
        background-color: #ff4500;
        border-color: #ff4500;
    }
`;

// class Agreement extends React.Component {
//     render() {
//         const { checked } = this.props;

const Agreement = (props) => {
    return (
        <StyleWrapper>
            <Checkbox
                {...props}
            />
            <span className="link">
                我已阅读并同意{" "}
                <Link to="/agreement/caopan">《实盘交易平台操盘协议》</Link>
            </span>
        </StyleWrapper>
    );
};
// }

export default Agreement;
