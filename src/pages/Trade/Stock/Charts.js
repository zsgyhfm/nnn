import React, { Component } from "react";
import styled from "styled-components";
import TimeLinePanel from "./TimeLinePanel";
import KChartPanel from "./KChartPanel";
const StyleWrapper = styled.div`
    margin-top: 10px;
    background-color: #fff;
    .hd {
        display: flex;
        padding-top: 4px;
        border-bottom: 1px solid #e8e8e8;
        padding: 0 10px;
        .item {
            flex: 1;
            text-align: center;
            line-height: 30px;
            color: #8e8e93;
            span {
                display: inline-block;
                padding: 0 5px;
                border-bottom: 2px solid transparent;
            }
            &.active span {
                border-color: #ff4500;
            }
        }
    }
    .bd {
        height: 300px;
        position: relative;
        .panel {
            position: absolute;
            padding: 5px 0;
            left: 0;
            top: 0;
            width: 100%;
            visibility: hidden;
            &.active {
                visibility: visible;
            }
        }
    }
`;

class Charts extends Component {
    state = {
        activeIndex: this.props.activeIndex || 0
    };

    changeTab = item => {
        this.setState({
            activeIndex: item.key
        });
    };

    render() {
        const { activeIndex } = this.state;

        return (
            <StyleWrapper>
                <div className="hd">
                    {tabHeader.map(item => (
                        <div
                            key={item.key}
                            onClick={() => this.changeTab(item)}
                            className={`item ${
                                item.key === activeIndex ? "active" : ""
                            }`}
                        >
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
                <div className="bd">
                    <TimeLinePanel
                        stockData={this.props.minuteData}
                        yesterdayPrice={this.props.yesterdayPrice}
                        active={activeIndex === 0}
                    />
                    <KChartPanel
                        activeIndex={activeIndex}
                        dayData={this.props.dayData}
                        weekData={this.props.weekData}
                        monthData={this.props.monthData}
                        active={activeIndex !== 0}
                    />
                </div>
            </StyleWrapper>
        );
    }
}

export default Charts;

const tabHeader = [
    {
        title: "分时",
        key: 0
    },
    {
        title: "日K",
        key: 1
    },
    {
        title: "周K",
        key: 2
    },
    {
        title: "月K",
        key: 3
    }
];
