import React from "react";
import styled from "styled-components";
import imgAdd from "images/icon-add.png";
import imgChecked from "images/icon-checked.png";
import { connect } from "react-redux";

const StyleWrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 3px 15px;
    line-height: 35px;
    .name {
        color: #252525;
        font-size: 16px;
        flex:1;
    }
    .code {
        color: #8e8e93;
        font-size: 14px;
    }
    .btn {
        display: flex;
        align-item: center;
        img {
            width: 0.5867rem;
            height: 0.5867rem;
        }
    }
`;

const StockItem = ({ stock, toggleSelect, onCheckStock, selection }) => {
    const inSelection = selection.some(item => {
        return item.code === stock.code;
    });
    return (
        <StyleWrapper>
            <span className="name" onClick={() => onCheckStock(stock)}>
                {stock.name} <span className="code">{stock.code}</span>
            </span>

            <span className="btn" onClick={() => toggleSelect(stock, inSelection)}>
                {inSelection ? (
                    <img src={imgChecked} alt="added" />
                ) : (
                    <img src={imgAdd} alt="add" />
                )}
            </span>
        </StyleWrapper>
    );
};

const mapStateToProps = state => ({
    selection: state.selection
});

export default connect(mapStateToProps)(StockItem);
