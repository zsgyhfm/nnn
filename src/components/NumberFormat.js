import React from "react";
import { toFixed } from "../util";

const NumberFormat = props => {
  let { className, value, tagName, unit = "" } = props;
  let formatedValue = toFixed(value, 2);
  if (tagName === "div") {
    return (
      <div className={className}>
        {formatedValue}
        {unit}
      </div>
    );
  } else {
    return (
      <span className={className}>
        {formatedValue}
        {unit}
      </span>
    );
  }
};
export default NumberFormat;
