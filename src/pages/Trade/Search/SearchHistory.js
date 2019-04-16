import React from "react";
import styled from "styled-components";
import imgTrash from "images/icon-trash.png";
import { Link, withRouter } from "react-router-dom";

const StyleWrapper = styled.div`
    padding: 0 15px;
    background-color: #fff;
    .hd {
        color: #8e8e93;
        line-height: 35px;
        display: flex;
        justify-content: space-between;
    }
`;

const SearchHistory = ({ historyStock, clearHistory, location }) => {
    
    if (!historyStock.length) return null;
    return (
        <StyleWrapper>
            <div className="hd">
                <div>历史搜索</div>
                <ClearHistory className="clear-history" onClick={clearHistory}>
                    <img src={imgTrash} alt="trash" /> 清空历史
                </ClearHistory>
            </div>
            <HistoryList>
                {historyStock.map(item => (
                    <HistoryItem
                        key={item.code}
                        to={{
                            pathname:
                                location.state && location.state.from
                                    ? `${location.state.from}${item.code}`
                                    : `/trade/stock/${item.code}`
                        }}
                    >
                        <div className="name">{item.name}</div>
                        <div className="code">{item.code}</div>
                    </HistoryItem>
                ))}
            </HistoryList>
        </StyleWrapper>
    );
};

export default withRouter(SearchHistory);

const ClearHistory = styled.div`
    img {
        width: 0.4rem;
        position: relative;
        top: 2px;
    }
`;
const HistoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 0 10px;
`;
const HistoryItem = styled(Link)`
    border: 1px solid #dddddd;
    width: 23%;
    margin: 0 1%;
    border-radius: 3px;
    padding: 5px 0;
    text-align: center;
    .name {
        font-size: 12px;
        line-height: 1.2;
        color: #252525;
    }
    .code {
        font-size: 12px;
        color: #8e8e93;
        line-height: 1.2;
    }
`;
