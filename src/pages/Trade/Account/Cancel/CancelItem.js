import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import round from "lodash/round";
const StyleWrapper = styled.tr`
    && td {
        padding: 10px;
        border-bottom: 1px solid #f1f1f1;
        line-height: 1.5;
        & > div:last-child {
            color: #8e8e93;
        }
    }
`;

const PositionItem = ({ item, onCancelTrust }) => {
    return (
        <StyleWrapper>
            <td align="left">
                <div>{item.gupiao_name}</div>
                <div className="code">{item.gupiao_code}</div>
            </td>
            <td>
                <div>{item.trust_price}</div>
                <div>{round(item.trust_count)}</div>
            </td>
            <td>
                <div>{item.status}</div>
                <div>{item.trust_time}</div>
            </td>
            <td align="right">
                <div className="cell"> {item.flag2} </div>
                <Button
                    type="warning"
                    size="small"
                    inline
                    onClick={() => onCancelTrust(item)}
                >
                    撤单
                </Button>
            </td>
        </StyleWrapper>
    );
};

export default withRouter(PositionItem);

const Button = styled.div`
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: #ff4500;
    margin-top: 4px;
    line-height: 1.8;
    padding: 0 15px;
`;
