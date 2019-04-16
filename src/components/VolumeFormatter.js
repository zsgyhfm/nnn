import React from "react";
import { numberFormat } from "../util";

const VolumeFormatter = ({ className, value = 0, tagName = "div", unit="" }) => {
  let formatedValue = numberFormat(value);

  if (tagName === "div") {
    return <div className={className}>{formatedValue}{unit}</div>;
  } else {
    return <span className={className}>{formatedValue}{unit}</span>;
  }
};

export default VolumeFormatter;
