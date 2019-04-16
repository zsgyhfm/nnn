import leftPad from "left-pad";

const xAxisTime = () => {
  let j = 930,
    k = 1130,
    l = 1300,
    m = 1500,
    arr = [];

  loopData(j, k, arr);
  loopData(l, m, arr);

  return arr;

};

function loopData(variable, length, returnArr) {
  for (variable; variable <= length; variable++) {
    if (variable.toString().substr(-2) < 60) {
      let str = leftPad(variable, 4, 0);
      returnArr.push( str.substr(0, 2) + ':' + str.substr(-2) );
    }
  }
}
export default xAxisTime;
