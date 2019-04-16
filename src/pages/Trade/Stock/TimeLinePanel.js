import React from "react";
import TimeLineChart from "components/TimelineChart/index";
const TimeLinePanel = ({ stockData, yesterdayPrice,active }) => {
    return (
        <div className={`panel ${active ? 'active' : ''}`}>
            <TimeLineChart
                stockData={stockData}
                yesterdayPrice={yesterdayPrice}
            />
        </div>
    );
};

export default TimeLinePanel;
