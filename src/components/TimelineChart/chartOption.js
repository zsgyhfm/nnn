import { toFixed } from "../../util";
import includes from "lodash/includes";
import echarts from "echarts/lib/echarts";
import xAxisTime from "./xAxisTime";

export const priceChartInitOption = {
    animation: false,
    title: {
        show: false
    },

    legend: {
        show: false
    },

    grid: {
        left: 4,
        right: 4,
        top: 10,
        bottom: 15
    },

    tooltip: {
        trigger: "axis",
        show: true
    },
    xAxis: {
        type: "category",
        gridIndex: 0,
        splitLine: {
            show: true,
            onGap: false,
            lineStyle: {
                color: "#EEE"
            },
            interval: 80
        },
        axisLine: {
            lineStyle: {
                color: "#CCC"
            }
        },
        axisLabel: {
            show: true,
            align: "center",
            margin: 3,
            fontSize: 12,
            fontFamily: "Arial",
            color: "#CCC",
            interval: function(index, item) {
                return includes([0, 120, 241], index);
            },
            formatter(value, index) {
                if (index === 120) return "11:30";
                return value;
            }
        },
        axisTick: {
            show: false
        },
        axisPointer: {
            z: 100
        },
        data: xAxisTime()
    },
    yAxis: {
        type: "value",
        position: "left",
        zlevel: 1,
        axisLabel: {
            fontSize: 12,
            fontFamily: "Arial",
            margin: 10,
            inside: true,
            formatter: function(params) {
                return toFixed(params, 2);
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#ccc",
                width: 1
            }
        },
        axisTick: {
            show: false
        },
        margin: 6,
        splitLine: {
            lineStyle: {
                color: "#eee"
            },
            show: true
        },
        
        axisPointer: {
            show: true,
            type: "line",
            snap: true,
            label: {
                precision: 2
            }
        }
    },

    series: {
        xAxisIndex: 0,
        yAxisIndex: 0,
        name: "当前价",
        type: "line",
        symbol: "none",
        position: "left",
        hoverAnimation: false,
        animation: false,
        connectNulls: false,
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: "#faa296"
                },
                areaStyle: {
                    color: (function() {
                        var echartsGraphic = echarts.graphic,
                            LinearGradient = echartsGraphic.LinearGradient;
                        return new LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: "#fcdcd3"
                            },
                            {
                                offset: 1,
                                color: "#fcdcd3"
                            }
                        ]);
                    })()
                }
            }
        }
    }
};

export const volumeChartInitOption = {
    animation: false,
    tooltip: {
        trigger: "axis",
        show: true,
        formatter(params) {
            // return numberFormat(params[0].value) + "手";
        }
    },
    grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    xAxis: {
        type: "category",
        boundaryGap: true,
        splitLine: {
            show: true,
            onGap: false,
            lineStyle: {
                color: "#e8e8e8"
            }
        },

        axisLabel: {
            show: false
        },
        data: xAxisTime()
    },
    yAxis: {
        scale: false,
        axisLabel: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    axisPointer: {
        link: {
            xAxisIndex: "all"
        },
        label: {
            backgroundColor: "#899198"
        }
    },
    series: [
        {
            name: "成交量",
            type: "bar",
            symbol: "none",
            barWidth: 1,
            hoverAnimation: false,
            animation: false
        }
    ]
};

export const convertData = data => {
    let volumes = [],
        times = [],
        prices = [];

    data &&
        data.forEach(item => {
            volumes.push(item.volume);
            prices.push(item.price);
            times.push(item.time.substr(0, 2) + ":" + item.time.substr(2, 2));
        });

    return {
        volumes,
        prices,
        times
    };
};
