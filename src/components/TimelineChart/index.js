import React, { Component } from "react";
import includes from "lodash/includes";
import { toFixed } from "../../util";
import echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import {
    priceChartInitOption,
    volumeChartInitOption,
    convertData
} from "./chartOption";
import TimelineChartHeader from "./TimelineChartHeader";

class TimelineChart extends Component {
    constructor(props) {
        super(props);
        this.volumeRef = React.createRef();
        this.priceRef = React.createRef();
    }
    state = {
        activeChartItem: {}
    };
    lastChartItem = {};

    componentDidMount() {
        // charts 联动
        this.volumeChart = echarts.init(this.volumeRef.current);
        this.priceChart = echarts.init(this.priceRef.current);
        echarts.connect([this.priceChart, this.volumeChart]);

        this.priceChart.setOption(priceChartInitOption);
        this.volumeChart.setOption(volumeChartInitOption);
    }
    componentDidUpdate() {
        const Chart = this;

        let { stockData, yesterdayPrice } = this.props;

        const data = convertData(stockData);
        yesterdayPrice = parseFloat(yesterdayPrice);
        const maxPrice = Math.max.apply(null, data.prices);
        const minPrice = Math.min.apply(null, data.prices);

        let maxGutter =
            Math.abs(minPrice - yesterdayPrice) >
            Math.abs(maxPrice - yesterdayPrice)
                ? Math.abs(minPrice - yesterdayPrice)
                : Math.abs(maxPrice - yesterdayPrice);
        maxGutter = toFixed(maxGutter, 7);

        const maxRangePrice = yesterdayPrice + maxGutter;
        const minRangePrice = yesterdayPrice - maxGutter;

        const priceChartUpdateOption = {
            tooltip: {
                formatter(params) {
                    var seriesInfo = params[0];
                    Chart.setState({
                        activeChartItem: {
                            price: seriesInfo.value,
                            time: seriesInfo.axisValue,
                            volume: data.volumes[params[0]["dataIndex"]]
                        }
                    });
                }
            },
            yAxis: {
                axisLabel: {
                    color: function(params) {
                        if (toFixed(params, 3) > yesterdayPrice)
                            return "#FF384F";
                        if (toFixed(params, 3) < yesterdayPrice)
                            return "#12E313";
                        return "#8e8e93";
                    }
                },
                interval: (maxRangePrice - minRangePrice) / 6,
                max: maxRangePrice,
                min: minRangePrice
            },
            series: [
                {
                    data: data.prices
                }
            ]
        };

        const volumeChartUpdateOption = {
            xAxis: {
                axisLabel: {
                    interval: function(index) {
                        if (index === 0 || index === data.volumes.length - 1)
                            return false;
                        return includes([0, 241, 120, 60, 181], index);
                    }
                }
            },
            series: [
                {
                    data: data.volumes,
                    itemStyle: {
                        normal: {
                            color(params) {
                                var index = params.dataIndex;
                                return index === 0
                                    ? computeBarColor(
                                          data.prices[0],
                                          yesterdayPrice
                                      )
                                    : computeBarColor(
                                          data.prices[index],
                                          data.prices[index - 1]
                                      );
                            }
                        }
                    }
                }
            ]
        };

        const lastIndex = data.prices.length === 0 ? 0 : data.prices.length - 1;
        this.lastChartItem = {
            price: data.prices[lastIndex],
            time: data.times[lastIndex],
            volume: data.volumes[lastIndex],
            ...this.state.activeChartItem
        };
        this.priceChart.setOption(priceChartUpdateOption);
        this.volumeChart.setOption(volumeChartUpdateOption);
    }
    render() {
        return (
            <div className="timeline-chart">
                <TimelineChartHeader
                    data={this.lastChartItem}
                    yesterdayPrice={this.props.yesterdayPrice}
                />
                <div
                    className="timeline-chart-price"
                    style={{ width: "100%", height: "202px" }}
                    ref={this.priceRef}
                />
                <div
                    className="timeline-chart-volume"
                    style={{ width: "100%", height: "40px" }}
                    ref={this.volumeRef}
                />
            </div>
        );
    }
}

export default TimelineChart;

const computeBarColor = (arg1, arg2) => {
    if (+arg1 > +arg2) {
        return "#ff384f";
    } else if (+arg1 < +arg2) {
        return "#11F311";
    } else {
        return "#999";
    }
};
