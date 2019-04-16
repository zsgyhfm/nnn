
import { toFixed } from "../../util";
export const splitData = rawData => {
  var categoryData = [];
  var values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return { categoryData: categoryData, values: values };
};

export const convertData = data => {
  const newData = [];
  const volumes = [];
  data.forEach((item, index) => {
    newData[index] = [];
    newData[index].push(
      "20" +
        item.time.substr(0, 2) +
        "/" +
        item.time.substr(2, 2) +
        "/" +
        item.time.substr(4, 2)
    );
    newData[index].push(item.open);
    newData[index].push(item.close);
    newData[index].push(item.low);
    newData[index].push(item.high);
    volumes.push(item.volume);
  });

  return { newData, volumes };
};

export const calculateMA = (dayCount, data0) => {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += parseFloat(data0.values[i - j][1]);
    }
    result.push(toFixed(sum / dayCount, 10));
  }
  return result;
};
