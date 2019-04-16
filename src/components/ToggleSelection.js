import React from "react";
import { connect } from "react-redux";
import { aAddSelfSelectedStock, aDeleteSelfSelectedStock } from "actions";

const ToggleSelection = ({ stock, selfSelectedStock, dispatch, memberId }) => {
    return inSelfSelected(stock.code, selfSelectedStock) ? (
        <InSelection dispatch={dispatch} stock={stock} memberId={memberId} />
    ) : (
        <UnSelection dispatch={dispatch} stock={stock} memberId={memberId} />
    );
};

const mapStateToProps = state => ({
    selfSelectedStock: state.selection.list,
    memberId: state.memberId
});

export default connect(mapStateToProps)(ToggleSelection);

const inSelfSelected = (code, stocks) => {
    return stocks.some(item => {
        return item.code === code;
    });
};

const UnSelection = ({ dispatch, stock, memberId }) => {
    return (
        <div
            className="add-selection"
            onClick={() => {
                dispatch(
                    aAddSelfSelectedStock(
                        { code: stock.code, name: stock.name },
                        memberId
                    )
                );
            }}
        >
            <i className="iconfont">&#xe63d;</i>
        </div>
    );
};

const InSelection = ({ dispatch, stock, memberId }) => {
    return <div className="add-selection" onClick={() => {
                dispatch(aDeleteSelfSelectedStock(stock.code));
            }}>
            <i className="iconfont"> &#xe625; </i>
        </div>;
};
