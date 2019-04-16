import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import { Link } from "react-router-dom";
const PalateContainer = styled.div``;

const PanelWrapper = styled.div`
    .header {
        display: flex;
        line-height: 35px;
        padding: 0 10px;
        a {
            width: 40px;
            text-align: right;
            color: #3e3e3e;
        }
        span {
            flex: 1;
            font-size: 16px;
            color: #3e3e3e;
        }
    }
    .bd{
        background-color: #fff;
        max-height: 0;
        overflow: hidden;
        &.show {
            max-height: 100%;
        }
    }
`;

class Panel extends Component {
    state = {
        show: true
    };
    toggleShow = () => {
        this.setState({
            show: !this.state.show
        });
    };
    render() {
        return (
            <PanelWrapper>
                <div className="header">
                    <span onClick={this.toggleShow}>
                        <Icon
                            type={this.state.show ? "down" : "up"}
                            size="xxs"
                        />
                        {this.props.header}
                    </span>
                    <Link to={this.props.link}>更多</Link>
                </div>
                <div className={`bd ${this.state.show ? 'show' : ''}`}>{this.props.children}</div>
            </PanelWrapper>
        );
    }
}
PalateContainer.Panel = Panel;
export default PalateContainer;
