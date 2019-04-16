import React from "react";
import { Switch } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { numberFormat } from "../../../util";
import tagTian from "images/tag-tian.png";
import tagTi from "images/tag-ti.png";
import tagYue from "images/tag-yue.png";
import tagZhou from "images/tag-zhou.png";
import tagMian from "images/tag-mian.png";
import StockColorText  from 'components/Text/StockColorText';
const StyleWrapper = styled.div`

    a {
        display: block;
        color: #8e8e93;
    }
    margin-bottom: 10px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    color: #8e8e93;
    background-color: #fff;
    font-size: 16px;
    line-height: 25px;

    @media (max-width: 330px) {
        font-size: 12px;
    }
    @media (min-width: 330px) and (max-width: 375px) {
        font-size: 14px;
    }
    .item-hd {
        border-bottom: 1px solid #e8e8e8;
        padding: 5px 10px;
        .status {
            float: right;
            &.active {
                color: #fd4400;
            }
            &.waitting {
                color: #459df5;
            }
        }
    }
    .item-bd {
        padding: 10px 0;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        .cell {
            flex: 1;
            text-align: center;
            .name {
                color: #252525;
            }
        }
    }
    .item-ft {
        padding: 5px 10px;
        font-size: 12px;
        .renewal {
            float: right;
            position: relative;
            top: -4px;
        }
    }
`;
const ListItem = ({ item, getFieldProps, onToggleRenewal }) => {
    let showRenewal;
    let tag;
    switch (item.type) {
        case "按天配资":
            tag = tagTian;
            showRenewal = true;

            break;
        case "按周配资":
            tag = tagZhou;
            showRenewal = true;

            break;
        case "按月配资":
            tag = tagYue;
            showRenewal = true;

            break;
        case "免费体验":
            tag = tagTi;
            showRenewal = false;

            break;
        case "免息配资":
            tag = tagMian;
            showRenewal = false;

            break;
        default:
            tag = "";
            showRenewal = true;
    }
    switch (item.status) {
        case -1:
        case 0:
        case 2:
        case 3:
            showRenewal = false;
            break;
        default:
    }
    return (
        <StyleWrapper>
            <Link to={`/member/peizi/detail/${item.id}`}>
                <div className="item-hd">
                    <div className="status active">{item.status_text}</div>
                    <div className="order-sn">
                        申请单号: {item.order_id ? item.order_id : "--"}{" "}
                        <img
                            src={tag}
                            width="16"
                            height="16"
                            style={{ position: "relative", top: "0.04rem" }}
                            alt="tag"
                        />
                    </div>
                </div>
                <div className="item-bd">
                    <div className="cell">
                        <div className="name">操盘资金</div>
                        <div>{numberFormat(item.init_money)}元</div>
                    </div>
                    <div className="cell">
                        <div className="name">可用余额</div>
                        <div>{numberFormat(item.avail)}元</div>
                    </div>
                    <div className="cell">
                        <div className="name">预计盈亏</div>
                        <div><StockColorText base={item.return_money}>{item.return_money}</StockColorText>元</div>
                    </div>
                </div>
            </Link>
            <div className="item-ft">
                {showRenewal ? (
                    <div className="renewal">
                        自动续期
                        <Switch
                            style={{ transform: "scale(0.8)" }}
                            {...getFieldProps(`autorenewal-${item.id}`, {
                                initialValue: item.renewal,
                                valuePropName: "checked"
                            })}
                            color="#FF4500"
                            onClick={() => onToggleRenewal(item.id)}
                        />
                    </div>
                ) : null}

                <div className="time">
                    操盘时间: {item.verify_time ? item.verify_time : "--"} 至{" "}
                    {item.end_time}
                </div>
            </div>
        </StyleWrapper>
    );
};

export default ListItem;
