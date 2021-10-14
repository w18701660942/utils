// 手机号
const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
// 身份证
const idCode = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 邮箱
const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
// 手机号码
const url = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
// IPv4
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
// 16进制颜色
const color16 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
// 日期 YYYY-MM-DD
const date = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/;
// 日期 YYYY-MM-DD hh:mm:ss
const dateTime = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
// 整数
const int= /^[-+]?\d*$/;
// 小数
const float = /^[-\+]?\d+(\.\d+)?$/;
// 保留n位小数
const toFixed = () => new RegExp(`^([1-9]+[\d]*(.[0-9]{1,${n}})?)$`);
// 邮政编号
const postalCode = /^\d{6}$/;
// QQ号 5-15
const qq = /^[1-9][0-9]{4,10}$/;
// 微信号 (6至20位，以字母开头，字母，数字，减号，下划线)
const wx = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
// 车牌号
const LicenseNum = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
// 只含字母的字符串
const str_en = /^[a-zA-Z]+$/;
// 包含中文的字符串
const str_cn = /[\u4E00-\u9FA5]/;
// 密码强度
const password = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
// 字符串长度n
const strLength = () => new RegExp(`^.{${n}}$`);
// 文件拓展名
const fileName = (arr) => {
    arr = arr.map(name => `.${name}`).join('|');
    return new RegExp(`(${arr})$`);
};
// 匹配img和src
const img = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/ig;
// 匹配html中的注释
const htmlNote = /<!--(.*?)-->/g;
// 匹配html中的style
const htmlStyle = /style="[^=>]*"([(\s+\w+=)|>])/g;
// 匹配html中的颜色
const htmlColor = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
// 匹配html标签
const html = /<("[^"]*"|'[^']*'|[^'">])*>/g;

export default {
    phone,
    idCode,
    email,
    url,
    ipv4,
    color16,
    date,
    dateTime,
    int,
    float,
    toFixed,
    postalCode,
    qq,
    wx,
    LicenseNum,
    str_en,
    str_cn,
    password,
    strLength,
    fileName,
    img,
    htmlNote,
    htmlStyle,
    htmlColor,
    html
};