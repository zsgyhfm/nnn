import React from "react";
import initOption from "./initOption";
import { splitData, convertData, calculateMA } from "./dataUtil";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/candlestick";
import "echarts/lib/component/tooltip";
import KChartHeader from "./KChartHeader";
class KChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            headerData: {}
        };
    }
    componentDidMount() {
        this.chart = echarts.init(this.chartRef.current);
        this.chart.setOption(initOption);
    }

    componentDidUpdate() {
        const { stockData } = this.props;
        let stockOptionData = {};
        const _this = this;
        if (stockData && stockData.length > 0) {
            const { newData, volumes } = convertData(stockData);
            let data0 = splitData(newData);
            stockOptionData = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "line",
                        snap: true,
                        axis: "x"
                    },
                    formatter(params) {
                        let data = setHeaderData(params, data0.values);
                        _this.setState({
                            headerData: data
                        });
                    }
                },
                xAxis: [
                    {
                        type: "category",
                        data: data0.categoryData,
                        min: "dataMin",
                        max: "dataMax",
                        axisLabel: { show: false },
                        splitLine: { show: false },
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: "#e8e8e8"
                            }
                        },
                        axisPointer : {
                            show: true,
                            snap: true,
                            z: 100

                        }
                    },
                    {
                        type: "category",
                        gridIndex: 1,
                        scale: true,
                        boundaryGap: false,
                        splitNumber: 20,
                        min: "dataMin",
                        max: "dataMax",
                        data: data0.categoryData,
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: "#e8e8e8"
                            }
                        }
                    }
                ],
                series: [
                    { data: data0.values },
                    { data: calculateMA(5, data0) },
                    { data: calculateMA(10, data0) },
                    { data: calculateMA(20, data0) },
                    {
                        data: volumes,
                        itemStyle: {
                            normal: {
                                color(params) {
                                    var index = params.dataIndex;
                                    if (
                                        data0.values[index][1] >
                                        data0.values[index][0]
                                    ) {
                                        return "#ff384f";
                                    } else if (
                                        data0.values[index][1] <
                                        data0.values[index][0]
                                    ) {
                                        return "#11F311";
                                    } else {
                                        return "#999";
                                    }
                                }
                            },
                            emphasis: {
                                color(params) {
                                    var index = params.dataIndex;
                                    if (
                                        data0.values[index][1] >
                                        data0.values[index][0]
                                    ) {
                                        return "#EF232A";
                                    } else if (
                                        data0.values[index][1] <
                                        data0.values[index][0]
                                    ) {
                                        return "#7FBE9E";
                                    } else {
                                        return "#999";
                                    }
                                }
                            }
                        }
                    }
                ],

      
            };
        }

        this.chart.setOption(stockOptionData);
    }

    render() {
        return (
            <div style={{ height: "300px" }}>
                <KChartHeader
                    meta={this.state.headerData}
                    visible={this.props.visible}
                />
                <div
                    className="kChart"
                    ref={this.chartRef}
                    style={{ height: "260px" }}
                />
            </div>
        );
    }
}
export default KChart;

const setHeaderData = (rawData, data0) => {
    let returnData = {};
    rawData.forEach(item => {
        returnData[item.seriesName] = item.data;
        returnData["yesterdayPrice"] =
            data0[item.dataIndex > 0 ? item.dataIndex - 1 : 0][1];
    });
    return returnData;
};
