import React, { Component } from "react";
import styled from "styled-components";
import { Toast } from "antd-mobile";
class Invite extends Component {

    onCopyLink = () => {
        this.link.select();
        document.execCommand("copy");
        this.link.blur();
        return Toast.info("复制成功", 1, null, false);
    };
    render() {
        return (
            <StyleWrapper>
                <QrCode>
                    <div className="title">您的邀请二维码</div>
                    <img
                        src={this.props.qrcode}
                        alt="invite qrcode"
                        width="150"
                        height="150"
                    />
                </QrCode>
                <Link>
                    <div className="title">推广链接</div>
                    <InputGroup>
                        <div>
                            <input
                                ref={node => (this.link = node)}
                                type="text"
                                value={this.props.inviteLink}
                                onChange={() => {
                                    return false;
                                }}
                            />
                        </div>
                        <button onClick={this.onCopyLink}>复制</button>
                    </InputGroup>
                </Link>
            </StyleWrapper>
        );
    }
}

const StyleWrapper = styled.div`
    .title {
        text-align: center;
        color: #252525;
    }
`;

const QrCode = styled.div``;

const Link = styled.div``;

const InputGroup = styled.div`
    display: flex;
    border-radius: 6px;
    margin: 10px 0;
    div {
        flex: 1;
    }
    input {
        width: 100%;
        border: none;
        line-height: 35px;
        padding: 0px 10px;
        border-radius: 6px 0 0 6px;
        border: 1px solid #ccc;
        border-right: none;
    }
    button {
        flex: 0 0 60px;
        height: 37px;
        text-align: center;
        line-height: 37px;
        background-color: #ff4500;
        color: #ffffff;
        border: none;
        border-radius: 0 6px 6px 0;
    }
`;

export default Invite;
