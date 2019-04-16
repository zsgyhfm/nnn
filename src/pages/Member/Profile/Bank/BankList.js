import React from "react";
import styled from "styled-components";
import TextBlue from "components/Text/TextBlue";
import { Link } from "react-router-dom";
import {hideNumber} from '../../../../util'

const EditBtn = TextBlue.withComponent(Link);

const BankItem = styled.div`
    background-color: #fff;
    margin-bottom: 15px;
    padding: 5px 15px;
    & > .cell {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 35px;
        > div {
            width: 50%;
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
        }
        .btns {
            text-align: right;
            span {
                display: inline-block;
                margin-left: 15px;
            }
        }
        span {
            color: #8e8d92;
        }
    }
    & > .cell:first-child {
        border-bottom: 1px solid #f1f1f1;
    }
`;

const Item = ({ data, bankKeys, deleteCard }) => {
    const bankName = bankKeys.find(item => item.id === data.bank);
    return (
        <BankItem>
            <div className="cell">
                <div> {bankName.name} </div>
               
                <div>
                    开户支行: <span>{data.branch}</span>{" "}
                </div>
            </div>
            <div className="cell">
                <div>
                    卡号: <span>{hideNumber(data.card, 'bank')}</span>{" "}
                </div>
                <div className="btns">
                    <EditBtn to={`/member/profile/bank/edit/${data.id}`}>
                        修改
                    </EditBtn>
                    <span onClick={() => deleteCard(data.id)}>删除</span>
                </div>
            </div>
        </BankItem>
    );
};

const BankList = ({ lists, bankKeys, deleteCard }) => {
    if (lists.length === 0) return null;
    return lists.map(item => (
        <Item
            key={item.id}
            data={item}
            bankKeys={bankKeys}
            deleteCard={deleteCard}
        />
    ));
};

export default BankList;
