import React, { PureComponent, Fragment } from "react";
import questionMark from "images/emphasize.png";
import { Modal } from "antd-mobile";

class TextWithQuestionMark extends PureComponent {
    state = {
        show: false
    };
    render() {
        const { text, info } = this.props;
        return (
            <Fragment>
                {text}
                <img
                    onClick={() => {
                        this.setState({
                            show: true
                        });
                    }}
                    style={{
                        width: "0.4rem",
                        height: "0.4rem",
                        position: "relative",
                        left: "0.04rem"
                    }}
                    src={questionMark}
                    alt="???"
                />
                <Modal
                    visible={this.state.show}
                    transparent
                    title={text}
                    footer={[
                        {
                            text: "确认",
                            onPress: () => {
                                this.setState({ show: false });
                            }
                        }
                    ]}
                >
                    {info}
                </Modal>
            </Fragment>
        );
    }
}

export default TextWithQuestionMark;
