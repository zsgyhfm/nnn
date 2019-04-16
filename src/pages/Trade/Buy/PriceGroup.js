import React, { PureComponent } from "react";
import OperatorItem from "../components/OperatorItem";
import { Popover } from "antd-mobile";
import TriangleDown from "components/Triangle/TriangleDown";

class PriceGroup extends PureComponent {
    state = {
        popoverVisible: false,
    };
   
    render() {
        const {
            price,
            tradeType,
            onChange,
            onDecreasePrice,
            onIncreasePrice,
            onChangeTradeType
        } = this.props;
        console.log("price",price)
        return (
            <OperatorItem>
                <div className="hd">
                    <Popover
                        mask
                        visible={this.state.popoverVisible}
                        overlay={[
                            <Popover.Item key={1}>限价</Popover.Item>,
                            <Popover.Item key={2}>市价</Popover.Item>
                        ]}
                        onSelect={item => onChangeTradeType(+item.key)}
                    >
                        <div>
                            {tradeType === 1 ? "限价" : "市价"} <TriangleDown />
                        </div>
                    </Popover>
                </div>
                <div className="bd">
                    <div className="input-group">
                        <div
                            className="button decrease"
                            onClick={onIncreasePrice}
                        >
                            +
                        </div>
                        <input
                            type="text"
                            readOnly={tradeType !== 1}
                            value={price}
                            name="price"
                            onChange={onChange}
                        />
                        <div
                            className="button increase"
                            onClick={onDecreasePrice}
                        >
                            -
                        </div>
                    </div>
                </div>
            </OperatorItem>
        );
    }
}

export default PriceGroup;
