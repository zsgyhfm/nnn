import React, { PureComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Badge = styled.span`
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #ff4500;
    border-radius: 3px;
`;
const ItemStyleWrapper = styled(Link)`
    display: block;
    padding: 5px 15px;
    color: #8e8e93;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
    .hd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 16px;
            color: #252525;
            line-height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
        }
    }

    .bd {
        font-size: 14px;
        .brief {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .date {
            text-align: right;
            line-height: 30px;
        }
    }
`;

class MessageItem extends PureComponent {
    state = {
        readed: 0
    };

    changeToReaded = (id, fn, unread) =>{
        if( unread === 1 || this.state.readed === 1) return;
        this.setState({
            readed: 1
        })
        fn(id)
    }

    render() {
        const { title, unread, id, brief, date, onClick } = this.props;
        const ItemWrapper = onClick
            ? ItemStyleWrapper.withComponent("div")
            : ItemStyleWrapper;
        return (
            <ItemWrapper
                to={`/member/message/detail/${id}`}
                onClick={() => {this.changeToReaded(id, onClick, unread)}}
            >
                <div className="hd">
                    <div className="title">{title}</div>
                    {unread  === 0 && this.state.readed === 0 ? <Badge /> : null}
                </div>
                <div className="bd">
                    <div className="brief">{brief}</div>
                    <div className="date">{date}</div>
                </div>
            </ItemWrapper>
        );
    }
}

export default MessageItem;
