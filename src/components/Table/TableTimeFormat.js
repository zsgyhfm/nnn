import React, { Fragment } from "react";

const TableTimeFormat = ({ time }) => {
    if (!time) return null;
    if (time.indexOf(" ") > 0) {
        var times = time.split(" ");
        return (
            <Fragment>
                <div>{times[1]}</div>
                <div style={{ color: "#8e8e93" }}>{times[0]}</div>
            </Fragment>
        );
    }
};
export default TableTimeFormat;
