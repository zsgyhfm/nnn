import React, { Component } from "react";
import { captchaUrl } from "api";
import styled from "styled-components";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
class Captcha extends Component {
    state = {
        url: captchaUrl
    };
    changeCaptcha = () => {
        this.setState({
            url: captchaUrl + "?" + Date.now()
        });
    };
    render() {
        const { style } = this.props;
        return (
            <Image
                src={this.state.url}
                onClick={this.changeCaptcha}
                alt="captcha"
                {...this.props}
                style={style}
            />
        );
    }
}
export default Captcha;
