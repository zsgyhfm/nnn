const initOption = {
    textStyle: {
        color: "#C6C6C6",
        fontFamily: "Arial"
    },
    backgroundColor: "#fff",

    dataZoom: [
        {
            type: "inside",
            start: 60,
            end: 100
        },
        {
            show: true,
            type: "slider",
            top: "75%",
            start: 60,
            end: 100
        }
    ],
    axisPointer: {
        type: "cross",
        animation: false,
        link: { xAxisIndex: "all" },

        lineStyle: {
            color: "#8e969c",
            width: 1,
            type: "solid"
        },
        label: {
            precision: 2,
            backgroundColor: "#8e969c"
        }
    },
    grid: [
        {
            height: "55%",
            left: 10,
            right: 10,
            top: 40
        },
        {
            top: "70%",
            height: "15%",
            left: 12,
            right: 12
        }
    ],
    xAxis: [
        {
            type: "category",
            data: [],
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
                snap: true
            }
        },
        {
            type: "category",
            gridIndex: 1,
            data: [],
            scale: true,
            boundaryGap: false,
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisLine: {
                onZero: true,
                lineStyle: {
                    color: "#e8e8e8"
                }
            }
        }
    ],
    yAxis: [
        {
            scale: true,
            boundaryGap: ["10%", "10%"],
            axisLine: {
                lineStyle: {
                    color: "#e8e8e8"
                }
            },
            axisLabel: {
                inside: true
            },
            minInterval: 1,
         
            splitLine: {
                lineStyle: {
                    color: "#e8e8e8",
                    type: "solid"
                }
            },
            axisPointer: {
                show: true,
                type: "line",
                snap: true
            }
        },
        {
            scale: true,
            boundaryGap: ["0%", "10%"],
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        }
    ],
    series: [
        {
            name: "日K",
            type: "candlestick",
            data: [],
            itemStyle: {
                normal: {
                    color: "#FF4500",
                    color0: "#05AA3B",
                    borderColor: null,
                    borderColor0: null
                }
            }
        },
        {
            name: "MA5",
            type: "line",
            data: [],
            showSymbol: false,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    color: "#FF3E8B"
                }
            }
        },
        {
            name: "MA10",
            type: "line",
            data: [],
            showSymbol: false,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    color: "#FFAC00"
                }
            }
        },
        {
            name: "MA20",
            type: "line",
            data: [],
            showSymbol: false,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    color: "#27E0EF"
                }
            }
        },
        {
            name: "成交量",
            type: "bar",
            symbol: "none",
            barWidth: 2,
            hoverAnimation: false,
            animation: false,
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: []
        }
    ],
    animation: false,
};

export default initOption;
