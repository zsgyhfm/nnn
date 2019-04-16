import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AgreementStyle = styled.div`
    color: #8e8e93;
    font-size: 12px;
    a {
        color: #459df5;
    }
`;
const Agreement = ({ mobile, code,  recommend }) => {
    return (
        <AgreementStyle>
            注册代表您已同意{" "}
            <Link
                to={{
                    pathname: "/agreement/register",
                    state: {
                        mobile,
                        code,
                        recommend
                    }
                }}
            >
                《用户注册协议》
            </Link>
        </AgreementStyle>
    );
};

export default Agreement;
