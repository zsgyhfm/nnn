import React, { Fragment } from "react";
import QuickAmount from "./../Account/components/QuickAmount";
import OperatorItem from "../components/OperatorItem";
import { WhiteSpace } from "antd-mobile";

const AmountGroup = ({
    amount,
    onChange,
    maxSellAmount,
    onDecreaseAmount,
    onIncreaseAmount,
    quickChangeAmount,
    quickAmountActive
}) => {
    return (
        <Fragment>
            <OperatorItem>
                <div className="hd">数量</div>
                <div className="bd">
                    <div className="input-group">
                        <div
                            className="button decrease"
                            onClick={onIncreaseAmount}
                        >
                            +
                        </div>
                        <input
                            type="number"
                            name="amount"
                            onChange={onChange}
                            placeholder={`可卖${maxSellAmount}股`}
                            value={amount}
                        />
                        <div
                            className="button increase"
                            onClick={onDecreaseAmount}
                        >
                            -
                        </div>
                    </div>
                </div>
            </OperatorItem>
            <WhiteSpace />
            <QuickAmount
                onClick={quickChangeAmount}
                active={quickAmountActive}
                type="sell"
            />
        </Fragment>
    );
};

export default AmountGroup;
