import leftPad from "left-pad";

export const toFixed = (value, precision = 2) => {
    return Number(Math.round(value + "e" + precision) + "e-" + precision);
};

export const numberFormat = (value = 0) => {
    let number = Number(value);
    // 万后精确2位
    // 不足万时，显示 1,234
    if (number >= 100000000) {
        number = toFixed(number / 100000000, 2) + "亿";
    } else if (number >= 10000) {
        number = toFixed(number / 10000, 2) + "万";
    } else if (number >= 1000) {
        number =
            number.toString().slice(0, 1) + "," + number.toString().slice(1);
    }
    return number;
};

export const nullValueToDash = value => {
    if (isNaN(value)) return "--";

    if (value !== 0) {
        if (!value) return "--";
    }
    return value;
};

export const getStockUpDown = (price, comparePrice) => {
    return price - comparePrice > 0
        ? "up"
        : price - comparePrice < 0
            ? "down"
            : "";
};

export const getDateStr = date => {
    return (
        date.getFullYear() +
        "-" +
        leftPad(date.getMonth() + 1, 2, 0) +
        "-" +
        leftPad(date.getDate(), 2, 0)
    );
};

export const getTimeStr = date => {
    return (
        date.getFullYear() +
        "-" +
        leftPad(date.getMonth() + 1, 2, 0) +
        "-" +
        leftPad(date.getDate(), 2, 0) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
    );
};

export const hideTelephone = telephone => {
    return (
        telephone.toString().substr(0, 3) +
        "****" +
        telephone.toString().substr(-3)
    );
};

export const isWeiXin = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (
        ua.match(/MicroMessenger/i) === "micromessenger" ||
        ua.match(/WeiBo/i) === "weibo"
    ) {
        return true;
    } else if (ua.indexOf("mobile mqqbrowser") > -1) {
        return true;
    } else if (ua.indexOf("iphone") > -1 || ua.indexOf("mac") > -1) {
        if (ua.indexOf("qqbrowser") > -1) {
            return false;
        }
        if (ua.indexOf("qq") > -1) {
            return true;
        }
    }
    return false;
};

export const hideNumber = (number, type) => {
    let str = number.toString()
    switch (type) {
        case "telephone":
        case "mobile":
            return str.substr(0, 3) + "****" + str.substr(-4);
        case "idCard":
            return str.substr(0, 8) + "****" + str.substr(-4);
        case "bank":
            return str.substr(0, 4) + "****" + str.substr(-4);
        default:
            return str;
    }
};
