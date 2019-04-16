import React from "react";
import ReactDom from "react-dom";

const SubAccountsActionSheet = ({ accounts, onSelect, onCancel }) => {
    return ReactDom.createPortal(
        <div className="subaccount-action-sheet">
            <div className="action-sheet-bd">
                <div className="actions-sheet-title">选择交易账户</div>
                <div className="actions-sheet-list">
                    {accounts.map(item => {
                        return <div className="actions-sheet-item" key={item.id} onClick={ () => onSelect(item) }>{item.sub_account}</div>;
                    })}
                </div>

                <div className="actions-sheet-cancel">
                    <div className="btn" onClick={ onCancel }>取消</div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SubAccountsActionSheet;
