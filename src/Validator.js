const Validator = {
    mobile(number) {
        let reg = /^1[345789]\d{9}$/;
        return reg.test(number);
    },
    paypass(text) {
        return /^(\d){6}$/.test(text);
    },
    password(text) {
        return /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,16}$/.test(
            text
        );
    },
    money(number) {
        return /^\d+(\.\d{1,2})?$/.test(number);
    },
    positiveInteger(number) {
        return /^[0-9]*[1-9][0-9]*$/.test(number);
    },

    integer(number) {
        return /^[1-9]\d*$/.test(number);
    },
    bankCard(bankno) {
        if (bankno.length < 16 || bankno.length > 19) {
            //$("#banknoInfo").html("银行卡号长度必须在16到19之间");
            return false;
        }
        var num = /^\d*$/; //全数字
        if (!num.exec(bankno)) {
            return false;
        }
        //开头6位
        var strBin =
            "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(bankno.substring(0, 2)) === -1) {
            //$("#banknoInfo").html("银行卡号开头6位不符合规范");
            return false;
        }
        var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与 luhm 进行比较）

        var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
        var newArr = [];
        for (var i = first15Num.length - 1; i > -1; i--) {
            //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = []; //奇数位*2的积 <9
        var arrJiShu2 = []; //奇数位*2的积 >9

        var arrOuShu = []; //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 === 1) {
                //奇数位
                if (parseInt(newArr[j], 10) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j], 10) * 2);
                else arrJiShu2.push(parseInt(newArr[j], 10) * 2);
            } //偶数位
            else arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = []; //奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = []; //奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h], 10) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h], 10) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m], 10);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n], 10);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p], 10);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p], 10);
        }
        //计算总和
        sumTotal =
            parseInt(sumJiShu, 10) +
            parseInt(sumOuShu, 10) +
            parseInt(sumJiShuChild1, 10) +
            parseInt(sumJiShuChild2, 10);

        //计算Luhm值
        var k =
            parseInt(sumTotal, 10) % 10 === 0
                ? 10
                : parseInt(sumTotal, 10) % 10;
        var luhm = 10 - k;

        return parseInt(lastNum, 10) === luhm;
    },
    idCard(sId) {
        var iSum = 0;
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
        sId = sId.replace(/x$/i, "a");
        if (aCity[parseInt(sId.substr(0, 2), 10)] === undefined) return false;
        let sBirthday =
            sId.substr(6, 4) +
            "-" +
            Number(sId.substr(10, 2)) +
            "-" +
            Number(sId.substr(12, 2));
        let d = new Date(sBirthday.replace(/-/g, "/"));
        if (
            sBirthday !==
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
        )
            return false;
        for (var i = 17; i >= 0; i--)
            iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        if (iSum % 11 !== 1) return false;
        return true;
    },
    email(email) {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(
            email
        );
    },
    captcha(captcha) {
        return /[0-9|a-z|A-Z]{4}/.test(captcha);
    },
    msgCode(code) {
        return /^\d{6}$/.test(code);
    }
};

export default Validator;
