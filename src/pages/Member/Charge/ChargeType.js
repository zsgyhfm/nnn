import React from "react";
import FormFieldGroup from "components/FormFieldGroup";
import styled from "styled-components";
import TriangleDown from "components/Triangle/TriangleDown";
import { Picker } from "antd-mobile";
const FieldWrapper = styled.div`
    position: relative;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    .hd {
        border-bottom: 1px solid #e8e8e8;
        line-height: 40px;
        padding: 3px 15px;
        text-align: center;
        font-size: 16px;
        .triangle {
            float: right;
            margin-top: 20px;
        }
    }
    .bd {
        min-height: 160px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        .charge-info {
            flex: 1;
            line-height: 25px;
            .row {
                display: flex;
                .field {
                    flex-basis: 40%;
                    text-align: right;
                }
                .value {
                    color: #8e8e93;
                    flex: 1;
                }
            }
        }
    }
`;

const ChargeType = ({ checkedWay, ways, onChangeWay }) => {
    const chargeWays = ways.map(item => ({
        label: item.bank_name,
        value: item.id
    }));
    return (
        <FormFieldGroup title="请选择充值方式">
            <FieldWrapper>
                <Picker
                    cols={1}
                    data={chargeWays}
                    disabled={chargeWays.length > 1 ? false : true}
                    onChange={onChangeWay}
                >
                    <div className="hd">
                        {checkedWay ? checkedWay.bank_name : "暂无充值方式"}{" "}
                        <TriangleDown />
                    </div>
                </Picker>
                <div className="bd">
                    <div className="charge-info">
                        <div className="row">
                            <div className="field">收款账号：</div>
                            <div className="value">
                                {checkedWay ? checkedWay.card : ""}
                            </div>
                        </div>
                        <div className="row">
                            <div className="field">收款人：</div>
                            <div className="value">
                                {checkedWay ? checkedWay.payee : ""}
                            </div>
                        </div>
                        {checkedWay && checkedWay.open_bank ? (
                            <div className="row">
                                <div className="field">开户行：</div>
                                <div className="value">
                                    {checkedWay ? checkedWay.open_bank : ""}
                                </div>
                            </div>
                        ) : null}
                        {checkedWay && checkedWay.notes ? (
                            <div className="row">
                                <div className="field">说明：</div>
                                <div className="value">
                                    {checkedWay ? checkedWay.notes : ""}
                                </div>
                            </div>
                        ) : null}
                        {checkedWay && checkedWay.image ? (
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={checkedWay.image}
                                    alt="图片加载错误"
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </FieldWrapper>
        </FormFieldGroup>
    );
};
export default ChargeType;
