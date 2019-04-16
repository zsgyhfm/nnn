import React from "react";
import { numberFormat } from "../util";

const TurnOverFormatter = ({
  className,
  value = 0,
  tagName = "div",
  unit = ""
}) => {
  let formatedValue = numberFormat(value * 10000);

  if (tagName === "div") {
    return (
      <div className={className}>
        {value !== 0 ? formatedValue : "--"}
        {unit}
      </div>
    );
  } else {
    return (
      <span className={className}>
        {value !== 0 ? formatedValue : "--"}
        {unit}
      </span>
    );
  }
};

export default TurnOverFormatter;
