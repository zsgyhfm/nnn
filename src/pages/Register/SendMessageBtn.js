import React, { PureComponent } from "react";
import { Toast } from "antd-mobile";

class SendMessageBtn extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: props.time,
            timmer: null,
            buttonEnable: true
        };
    }
    onClick = fn => {
        if (this.state.time === this.props.time && this.state.buttonEnable) {
            this.setState({
                buttonEnable: false
            });
            clearInterval(this.timmer);
            let result = fn();
            if ( !!result && typeof result.then === "function") {
                result.then(res => {
                    if (res.data.status === "1") {
                        this.timmer = setInterval(() => {
                            if (this.state.time === 0) {
                                clearInterval(this.timmer);
                                this.setState({
                                    time: this.props.time,
                                    buttonEnable: true
                                });
                            } else {
                                this.setState({
                                    time: this.state.time - 1
                                });
                            }
                        }, 1000);
                    } else {
                        Toast.fail(res.data.message);
                        this.setState({
                            buttonEnable: true
                        });
                    }
                });
            } else {
                this.setState({
                    buttonEnable: true
                });
            }
        }
    };
    render() {
        const { onClick: fn } = this.props;
        const innerText =
            this.state.time === this.props.time
                ? "获取验证码"
                : this.state.time + "s";
        return (
            <div
                onClick={() => this.onClick(fn)}
                style={{
                    color: this.state.buttonEnable ? "#459DF5" : "#888",
                    minWidth: "60px",
                    textAlign: "center"
                }}
            >
                {innerText}
            </div>
        );
    }
}
export default SendMessageBtn;
