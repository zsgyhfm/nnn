import React, { Component } from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

class InputItem extends Component {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }
    onFocus = e => {
        setTimeout(() => {
            this.el.current.scrollIntoView(true);
        }, 200);
    };

    render() {
        const { label, extra, children, ...rest } = this.props;
        return (
            <StyleWrapper ref={el => (this.node = el)}>
                <InputControl>
                    {label ? <span className="label"> {label}</span> : null}
                    <input ref={this.el} {...rest} onFocus={this.onFocus} />
                </InputControl>

                {extra ? <ExtraWrapper>{extra}</ExtraWrapper> : null}
            </StyleWrapper>
        );
    }
}

export default InputItem;

const InputControl = styled.div`
    background-color: #db2b13;
    border-radius: 5px;
    display: inline-flex;
    flex: 1 1 20px;
    .label {
        display: flex;
        width: 30px;
        align-items: center;
        justify-content: center;

        img {
            flex-grow: 0;
            width: 15px;
        }
    }
    input {
        flex: 1;
        font-size: 14px;
        border: none;
        line-height: 35px;
        padding: 3px 5px;
        background-color: transparent;
        color: #ffffff;
        &::placeholder {
            color: #ff8372;
        }
    }
`;

const ExtraWrapper = styled.div`
    width: 120px;
    padding-left: 20px;
    button {
        width: calc(100%);
    }
`;
