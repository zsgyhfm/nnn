import React from "react";
import styled from "styled-components";
import Refresh from "./Refresh";
import BaseTable from "components/Table/BaseTable";

const StyleWrapper = styled.div`
    background-color: #fff;
    border-radius: 5px;
    .hd {
        padding: 3px 10px 0;
        line-height: 35px;
        font-size: 16px;
        color: #252525;
        position: relative;
    }
`;

const RefreshBtn = styled(Refresh)`
    float: right;
    margin: 6px 0;
`;

const RecordTable = ({ title, fields, lists ,onRefresh, children, loading }) => {
    return (
        <StyleWrapper>
            <div className="hd">
                {title}
                <RefreshBtn onClick={onRefresh} loading={loading}/>
            </div>
            <BaseTable fields={fields} lists={lists}>
                {item => children(item)}
            </BaseTable>
        </StyleWrapper>
    );
};

export default RecordTable;
