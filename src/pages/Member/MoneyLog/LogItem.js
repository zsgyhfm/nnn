import React from "react";

import TableTimeFormat from "components/Table/TableTimeFormat";
import TextPrimary from "components/Text/TextPrimary";
import TextGreen from "components/Text/TextGreen";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    padding: 0 15px;
    & > div {
        padding: 10px 0;
        flex-basis: 25%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #E8E8E8;
        color: #252525;
        div {
            display: block;
            width: 100%;
        }
    }
`;

const LogItem = ({ time, type, money, account }) => {
    return (
        <StyleWrapper>
            <div>
                <div>
                    <TableTimeFormat time={time} />
                </div>
            </div>
            <div>
                <div>{type}</div>
            </div>
            <div>
                {money > 0 ? (
                    <TextPrimary>{money}</TextPrimary>
                ) : (
                    <TextGreen>{money}</TextGreen>
                )}
            </div>
            <div>{account}</div>
        </StyleWrapper>
    );
};

export default LogItem;
