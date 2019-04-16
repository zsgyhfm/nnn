import React, { PureComponent } from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
    padding: ${props => (props.padding ? props.padding : "10px 0")};
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    display: flex;
    align-items: center;
    .label {
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        img {
            max-width: 80%;
            max-height: 80%;
        }
    }
    .input-control {
        flex: 1;
        input {
            border: none;
            line-height: 25px;
            height: 25px;
            padding: 0 10px;
            font-size: 16px;
            width: 100%;
            &::placeholder {
                color: #c7c7c7;
            }
        }
    }
    .extra {
        flex: initial;
        min-width: 0;
        white-space: nowrap;
    }
`;

class InputItem extends PureComponent {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }
    componentDidMount() {
        this._isMount = true;
    }
    componentWillUnmount() {
        this._isMount = false;
    }
    onFocus = e => {
        setTimeout(() => {
            this._isMount && this.el.current.scrollIntoView(false);
        }, 200);
    };

    render() {
        const {
            icon,
            placeholder,
            type,
            extra,
            padding,
            onChange,
            value,
            name
        } = this.props;
        return (
            <StyleWrapper padding={padding}>
                <div className="label">{icon}</div>
                <div className="input-control">
                    <input
                        name={name}
                        ref={this.el}
                        type={type}
                        onFocus={this.onFocus}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                </div>
                <div className="extra">{extra}</div>
            </StyleWrapper>
        );
    }
}
export default InputItem;
