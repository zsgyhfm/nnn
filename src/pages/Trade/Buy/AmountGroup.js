import React, { PureComponent, Fragment } from "react";
import { WhiteSpace } from "antd-mobile";
import OperatorItem from "../components/OperatorItem";
import QuickAmount from "./../Account/components/QuickAmount";

class AmountGroup extends PureComponent {
    render() {
        const {
            maxCanBuy,
            amount,
            quickAmount,
            onDecreaseAmount,
            onIncreaseAmount,
            quickAmountActive,
            onChange,
            onAmountBlur
        } = this.props;
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
                                onBlur={onAmountBlur}
                                placeholder={`可买${maxCanBuy || 0}股`}
                                disabled={this.props.code === null}
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
                    onClick={quickAmount}
                    active={quickAmountActive}
                    type="buy"
                />
            </Fragment>
        );
    }
}

export default AmountGroup;
