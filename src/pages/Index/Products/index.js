import React from "react";
import StyleWrapper from "./StyleWrapper";
import Item from "./Item";
import imgMian from "../../../images/mian.png";
import imgTian from "../../../images/tian.png";
import imgZhou from "../../../images/zhou.png";
import imgYue from "../../../images/yue.png";

const Products = ({rebate}) => {
    return (
        <StyleWrapper>
            <div className="product-hd">申请操盘</div>
            <div className="product-list">
                <Item
                    to="/peizi/day"
                    title="按天操盘"
                    text="自动延期丨按日计息丨非交易日不收费"
                    figure={imgTian}
                />
                <Item
                    to="/peizi/week"
                    title="按周操盘"
                    text="自动延期丨低费率高倍率丨5个交易日"
                    figure={imgZhou}
                />
                <Item
                    to="/peizi/month"
                    title="按月操盘"
                    text="自动延期丨更划算丨1个自然月"
                    figure={imgYue}
                />
                <Item
                    to="/peizi/free"
                    title="免息操盘"
                    text={`短期狙击利器丨免所有费用丨盈利${rebate}归您`}
                    figure={imgMian}
                />
            </div>
        </StyleWrapper>
    );
};
export default Products;
