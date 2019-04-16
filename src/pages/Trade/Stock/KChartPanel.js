import React from "react";
import KChart from "components/KChart/";
const KChartPanel = ({ activeIndex, dayData, weekData, monthData,active }) => {
    let stockData;
    switch (activeIndex) {
        case 1:
            stockData = dayData;
            break;
        case 2:
            stockData = weekData;
            break;
        case 3:
            stockData = monthData;
            break;
        default:
            stockData = [];
    }
    return (
        <div className={`panel ${active ? 'active' : ''}`}>
            <KChart
                stockData={stockData}
                activeKey={activeIndex}
                visible={active}
            />
        </div>
    );
};

export default KChartPanel;
