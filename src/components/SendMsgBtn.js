import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Toast } from "antd-mobile";

const StyleWrapper = styled.button`
    display: inline-block;
    width: auto;
    height: 100%;
    min-height: 26px;
    border: none;
    background-color: ${props => (props.disable ? "#C8C8C8" : "#fbc02d")};
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding: 0 10px;
    border-radius: 6px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
`;

class SendMsgBtn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            disable: false,
            second: this.props.duration
        };
    }

    onClick = (fn, e) => {
        e.preventDefault();
        if (this.state.disable) return;
        this.setState({
            disable: true
        });
        let result = fn();
        if (!!result && typeof result.then === "function") {
            result.then(res => {
                if (res.data.status === "1") {
                    this.timmer = setInterval(() => {
                        let second = this.state.second;

                        if (second === 0) {
                            clearInterval(this.timmer);
                            this.setState({
                                second: this.props.duration,
                                disable: false
                            });
                        } else {
                            this.setState({
                                second: second - 1
                            });
                        }
                    }, 1000);
                } else {
                    Toast.fail(res.data.message);
                    this.setState({
                        disable: false
                    });
                }
            });
        } else {
            this.setState({
                disable: false
            });
        }
    };

    render() {
        return (
            <StyleWrapper
                disable={this.state.disable}
                onClick={e => this.onClick(this.props.onSend, e)}
            >
                {this.state.disable
                    ? `重新发送(${this.state.second})`
                    : "获取验证码"}
            </StyleWrapper>
        );
    }
}

export default SendMsgBtn;

SendMsgBtn.propTypes = {
    duration: PropTypes.number,
    onSend: PropTypes.func
};
